
"use server";

import * as z from 'zod';
import { Resend } from 'resend';

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

  // --- Uncomment to send email with Resend ---
  /*
  try {
    // Make sure to add RESEND_API_KEY to your environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Note: File uploads need to be handled separately. A common approach is to upload
    // them to a service like Firebase Storage and include the links in the email.
    
    await resend.emails.send({
      from: 'forms@your-verified-domain.com', // Must be a domain you've verified with Resend
      to: 'your-personal-email@example.com', // The inbox you want to receive applications
      subject: `New Membership Application: ${formData.nameEn}`,
      html: `
        <h1>New Membership Application</h1>
        <pre><code>${JSON.stringify(formData, null, 2)}</code></pre>
      `
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    // You might want to return an error to the user so they know the email failed.
    // return { success: false, error: 'Application submitted, but failed to send email notification.' };
  }
  */
  // --- End of email sending code ---

  await sleep(1000);

  // We are not handling file uploads here, just logging the metadata
  console.log('New Membership Application:', {
      ...formData,
      photo: photo ? { name: photo.name, size: photo.size, type: photo.type } : 'No photo uploaded',
      nomineePhoto: nomineePhoto ? { name: nomineePhoto.name, size: nomineePhoto.size, type: nomineePhoto.type } : 'No photo uploaded',
  });

  if (Math.random() > 0.9) {
      return { success: false, error: "Database error. Please try again." };
  }

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
    
    // --- Uncomment to send email with Resend ---
    /*
    try {
      // Make sure to add RESEND_API_KEY to your environment variables
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'forms@your-verified-domain.com', // Must be a domain you've verified with Resend
        to: 'your-personal-email@example.com', // The inbox you want to receive inquiries
        subject: `New Contact Inquiry from ${validatedFields.data.name}`,
        html: `
          <h1>New Contact Inquiry</h1>
          <p><strong>Name:</strong> ${validatedFields.data.name}</p>
          <p><strong>Phone:</strong> ${validatedFields.data.phone}</p>
          <p><strong>Inquiry:</strong> ${validatedFields.data.inquiry}</p>
        `
      });
    } catch (error) {
      console.error('Email sending failed:', error);
    }
    */
    // --- End of email sending code ---

    await sleep(1000);
    
    console.log('New Contact Inquiry:', validatedFields.data);

    if (Math.random() > 0.9) {
        return { success: false, error: "Service unavailable" };
    }
    
    return { success: true };
}
