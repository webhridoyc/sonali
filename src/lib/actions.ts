"use server";

import * as z from 'zod';

// Mock database delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const applicationSchema = z.object({
  name: z.string().min(1),
  nid: z.string().regex(/^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/),
  phone: z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/),
  address: z.string().min(1),
});

export async function applyForMembership(values: z.infer<typeof applicationSchema>) {
  const validatedFields = applicationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!', success: false };
  }
  
  await sleep(1000);

  console.log('New Membership Application:', validatedFields.data);

  // In a real app, you would save this to a database.
  // We'll randomly simulate a failure.
  if (Math.random() > 0.9) {
      return { success: false, error: "Database error" };
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
