
"use server";

import * as z from 'zod';
import { Resend } from 'resend';
import { adminServerTimestamp, getAdminFirestore } from '@/firebase/admin';

// Mock database delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const applicationSchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().min(1),
  fatherName: z.string().min(1),
  motherName: z.string().min(1),
  spouseName: z.string().optional(),
  
  presentAddressVillage: z.string().min(1),
  presentAddressPost: z.string().min(1),
  presentAddressUpazila: z.string().min(1),
  presentAddressDistrict: z.string().min(1),

  isSameAddress: z.boolean().default(false),

  permanentAddressVillage: z.string().optional(),
  permanentAddressPost: z.string().optional(),
  permanentAddressUpazila: z.string().optional(),
  permanentAddressDistrict: z.string().optional(),

  nationality: z.string().min(1),
  religion: z.string().min(1),
  maritalStatus: z.string().min(1),
  gender: z.enum(['male', 'female', 'other']),
  bloodGroup: z.string().optional(),
  
  phone: z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/),
  nid: z.string().regex(/^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/),
  passport: z.string().optional(),

  photo: z.any().optional(),

  nomineeName: z.string().min(1),
  nomineeRelationship: z.string().min(1),
  nomineePhone: z.string().min(1),
  nomineeAddress: z.string().min(1),
  nomineePhoto: z.any().optional(),
}).refine(data => {
    if (!data.isSameAddress) {
        return !!data.permanentAddressVillage && !!data.permanentAddressPost && !!data.permanentAddressUpazila && !!data.permanentAddressDistrict;
    }
    return true;
}, {
  message: "Permanent address is required when different from present address.",
  path: ["permanentAddressVillage"],
});


export async function applyForMembership(values: z.infer<typeof applicationSchema>) {
  const validatedFields = applicationSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return { error: 'Invalid fields! Please check the form and try again.', success: false };
  }
  
  const { photo, nomineePhoto, ...formData } = validatedFields.data;

  // Persist to Firestore (required) so every submission shows up in the admin dashboard.
  const db = getAdminFirestore();
  if (!db) {
    return { error: 'Server is not configured to store submissions yet. Please try again later.', success: false };
  }

  try {
    await db.collection('membershipApplications').add({
      ...formData,
      submittedAt: adminServerTimestamp(),
      source: 'website',
    });
  } catch (error) {
    console.error('Firestore persistence failed:', error);
    return { error: 'Failed to save your application. Please try again.', success: false };
  }

  // Send email notification (best-effort)
  const resendApiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESEND_RECIPIENT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (resendApiKey && recipient && from) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from,
        to: recipient,
        subject: `New Membership Application: ${formData.nameEn}`,
        html: `
          <h1>New Membership Application</h1>
          <pre><code>${JSON.stringify(formData, null, 2)}</code></pre>
        `,
      });
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  await sleep(1000);

  return { success: true };
}


const contactSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    inquiry: z.string().min(1),
});

export async function submitInquiry(values: z.infer<typeof contactSchema>) {
    const validatedFields = contactSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!', success: false };
    }


    // Persist to Firestore (required) so every submission shows up in the admin dashboard.
    const db = getAdminFirestore();
    if (!db) {
      return { error: 'Server is not configured to store submissions yet. Please try again later.', success: false };
    }

    try {
      await db.collection('contactInquiries').add({
        ...validatedFields.data,
        submittedAt: adminServerTimestamp(),
        source: 'website',
      });
    } catch (error) {
      console.error('Firestore persistence failed:', error);
      return { error: 'Failed to save your message. Please try again.', success: false };
    }

    // Send email notification (best-effort)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.RESEND_RECIPIENT_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;

    if (resendApiKey && recipient && from) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from,
          to: recipient,
          subject: `New Contact Inquiry from ${validatedFields.data.name}`,
          html: `
            <h1>New Contact Inquiry</h1>
            <p><strong>Name:</strong> ${validatedFields.data.name}</p>
            <p><strong>Phone:</strong> ${validatedFields.data.phone}</p>
            <p><strong>Inquiry:</strong></p>
            <p>${validatedFields.data.inquiry}</p>
          `,
        });
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }

    await sleep(1000);
    
    return { success: true };
}
