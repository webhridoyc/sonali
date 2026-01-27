"use server";

import * as z from 'zod';

// Mock database delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const applicationSchema = z.object({
  name: z.string().min(1),
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
  
  await sleep(1000);

  // We are not handling file uploads here, just logging the metadata
  const { photo, nomineePhoto, ...rest } = validatedFields.data;
  
  console.log('New Membership Application:', {
      ...rest,
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
    
    await sleep(1000);
    
    console.log('New Contact Inquiry:', validatedFields.data);

    if (Math.random() > 0.9) {
        return { success: false, error: "Service unavailable" };
    }
    
    return { success: true };
}
