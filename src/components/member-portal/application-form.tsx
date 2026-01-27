
"use client";

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { applyForMembership } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  nameEn: z.string().min(1, { message: 'This field is required' }),
  fatherName: z.string().min(1, { message: 'This field is required' }),
  motherName: z.string().min(1, { message: 'This field is required' }),
  spouseName: z.string().optional(),
  
  presentAddressVillage: z.string().min(1, { message: 'This field is required' }),
  presentAddressPost: z.string().min(1, { message: 'This field is required' }),
  presentAddressUpazila: z.string().min(1, { message: 'This field is required' }),
  presentAddressDistrict: z.string().min(1, { message: 'This field is required' }),

  isSameAddress: z.boolean().default(false),

  permanentAddressVillage: z.string().optional(),
  permanentAddressPost: z.string().optional(),
  permanentAddressUpazila: z.string().optional(),
  permanentAddressDistrict: z.string().optional(),

  nationality: z.string().min(1, { message: 'This field is required' }),
  religion: z.string().min(1, { message: 'This field is required' }),
  maritalStatus: z.string().min(1, { message: 'This field is required' }),
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: 'This field is required' }) }),
  bloodGroup: z.string().optional(),
  
  phone: z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, { message: 'Please enter a valid Bangladeshi phone number' }),
  nid: z.string().regex(/^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/, { message: 'Please enter a valid NID number (10, 13, or 17 digits)' }),
  passport: z.string().optional(),

  photo: z.any().optional(),

  nomineeName: z.string().min(1, { message: 'This field is required' }),
  nomineeRelationship: z.string().min(1, { message: 'This field is required' }),
  nomineePhone: z.string().min(1, { message: 'This field is required' }),
  nomineeAddress: z.string().min(1, { message: 'This field is required' }),
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

type FormValues = z.infer<typeof formSchema>;

export function ApplicationForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nameEn: '',
      fatherName: '',
      motherName: '',
      spouseName: '',
      presentAddressVillage: '',
      presentAddressPost: '',
      presentAddressUpazila: '',
      presentAddressDistrict: '',
      isSameAddress: false,
      permanentAddressVillage: '',
      permanentAddressPost: '',
      permanentAddressUpazila: '',
      permanentAddressDistrict: '',
      nationality: 'Bangladeshi',
      religion: '',
      maritalStatus: '',
      bloodGroup: '',
      phone: '',
      nid: '',
      passport: '',
      nomineeName: '',
      nomineeRelationship: '',
      nomineePhone: '',
      nomineeAddress: '',
    },
  });

  const isSameAddress = form.watch('isSameAddress');

  useEffect(() => {
    const presentAddress = {
      village: form.getValues('presentAddressVillage'),
      post: form.getValues('presentAddressPost'),
      upazila: form.getValues('presentAddressUpazila'),
      district: form.getValues('presentAddressDistrict'),
    };
    if (isSameAddress) {
      form.setValue('permanentAddressVillage', presentAddress.village);
      form.setValue('permanentAddressPost', presentAddress.post);
      form.setValue('permanentAddressUpazila', presentAddress.upazila);
      form.setValue('permanentAddressDistrict', presentAddress.district);
    } else {
        form.setValue('permanentAddressVillage', '');
        form.setValue('permanentAddressPost', '');
        form.setValue('permanentAddressUpazila', '');
        form.setValue('permanentAddressDistrict', '');
    }
  }, [isSameAddress, form]);

  const generatePdf = async () => {
    const input = pdfRef.current;
    if (!input || !submittedData) return;

    toast({
        title: 'Generating PDF...',
        description: 'Your application PDF is being prepared for download.',
    });

    const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`membership-application-${submittedData.nameEn.replace(/ /g, '_')}.pdf`);
    setSubmittedData(null);
  };

  useEffect(() => {
    if (submittedData) {
        const timer = setTimeout(() => {
            generatePdf();
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [submittedData]);

  async function onSubmit(values: FormValues) {
    const result = await applyForMembership(values);
    if (result.success) {
      toast({
        title: t('memberPortal.submitSuccess'),
        description: 'Your application is being prepared for download.',
      });
      setSubmittedData(values);
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: t('memberPortal.submitError'),
        description: result.error || t('memberPortal.submitErrorDesc'),
      });
    }
  }

  return (
    <>
      {submittedData && (
        <div className="absolute -left-[10000px] top-0 p-10 bg-white">
          <div ref={pdfRef}>
            <ApplicationPDF data={submittedData} t={t} />
          </div>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('memberPortal.formSectionPersonal')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('memberPortal.formName')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="nameEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('memberPortal.formNameEn')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="fatherName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('memberPortal.formFatherName')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="motherName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('memberPortal.formMotherName')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="spouseName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('memberPortal.formSpouseName')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
              </div>
            </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle>{t('memberPortal.formSectionAddress')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="space-y-4 p-4 border rounded-md">
                      <h4 className="font-medium">{t('memberPortal.formPresentAddress')}</h4>
                      <div className="grid sm:grid-cols-2 gap-6">
                          <FormField control={form.control} name="presentAddressVillage" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formVillage')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                          <FormField control={form.control} name="presentAddressPost" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formPostOffice')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                          <FormField control={form.control} name="presentAddressUpazila" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formUpazila')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                          <FormField control={form.control} name="presentAddressDistrict" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formDistrict')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      </div>
                  </div>
                  <FormField
                      control={form.control}
                      name="isSameAddress"
                      render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                              <FormLabel>{t('memberPortal.formSameAsPresent')}</FormLabel>
                          </div>
                          </FormItem>
                      )}
                  />
                  {!isSameAddress && (
                       <div className="space-y-4 p-4 border rounded-md">
                          <h4 className="font-medium">{t('memberPortal.formPermanentAddress')}</h4>
                          <div className="grid sm:grid-cols-2 gap-6">
                              <FormField control={form.control} name="permanentAddressVillage" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formVillage')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                              <FormField control={form.control} name="permanentAddressPost" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formPostOffice')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                              <FormField control={form.control} name="permanentAddressUpazila" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formUpazila')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                              <FormField control={form.control} name="permanentAddressDistrict" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formDistrict')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                          </div>
                      </div>
                  )}
              </CardContent>
          </Card>

          <Card>
              <CardHeader><CardTitle>{t('memberPortal.formSectionOther')}</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                   <div className="grid sm:grid-cols-3 gap-6">
                      <FormField control={form.control} name="nationality" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formNationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="religion" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formReligion')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formMaritalStatus')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formPhone')}</FormLabel><FormControl><Input placeholder="01xxxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="nid" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formNid')}</FormLabel><FormControl><Input placeholder="xxxxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="passport" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formPassport')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="bloodGroup" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formBloodGroup')}</FormLabel><FormControl><Input placeholder="e.g. B+" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                              <FormItem className="space-y-3">
                              <FormLabel>{t('memberPortal.formGender')}</FormLabel>
                              <FormControl>
                                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                  <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">{t('memberPortal.formMale')}</FormLabel></FormItem>
                                  <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">{t('memberPortal.formFemale')}</FormLabel></FormItem>
                                  <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="other" /></FormControl><FormLabel className="font-normal">{t('memberPortal.formOther')}</FormLabel></FormItem>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField control={form.control} name="photo" render={({ field }) => (
                          <FormItem>
                              <FormLabel>{t('memberPortal.formPhoto')}</FormLabel>
                              <FormControl><Input type="file" accept="image/*" onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                              <FormDescription>{t('formValidation.photoDesc')}</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}/>
                  </div>
              </CardContent>
          </Card>

          <Card>
              <CardHeader><CardTitle>{t('memberPortal.formNomineeInfo')}</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                      <FormField control={form.control} name="nomineeName" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formNomineeName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="nomineeRelationship" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formNomineeRelationship')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="nomineePhone" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formNomineePhone')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="nomineeAddress" render={({ field }) => (<FormItem><FormLabel>{t('memberPortal.formNomineeAddress')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                      <FormField control={form.control} name="nomineePhoto" render={({ field }) => (
                          <FormItem>
                              <FormLabel>{t('memberPortal.formNomineePhoto')}</FormLabel>
                              <FormControl><Input type="file" accept="image/*" onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                               <FormDescription>{t('formValidation.photoDesc')}</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}/>
                  </div>
              </CardContent>
          </Card>

          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full text-lg" size="lg">
            {form.formState.isSubmitting ? t('memberPortal.submitting') : t('memberPortal.submit')}
          </Button>
        </form>
      </Form>
    </>
  );
}


const ApplicationPDF = ({ data, t }: { data: FormValues, t: (key: string) => string }) => {
    return (
      <div className="p-8 bg-white text-black font-sans" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'sans-serif' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sonali Shokal Somobay Somity</h1>
          <p className="text-lg">Membership Application Form</p>
        </div>
  
        <div className="space-y-6">
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-black pb-1">
              {t('memberPortal.formSectionPersonal')}
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div><strong>{t('memberPortal.formName')}:</strong> {data.name}</div>
              <div><strong>{t('memberPortal.formNameEn')}:</strong> {data.nameEn}</div>
              <div><strong>{t('memberPortal.formFatherName')}:</strong> {data.fatherName}</div>
              <div><strong>{t('memberPortal.formMotherName')}:</strong> {data.motherName}</div>
              <div><strong>{t('memberPortal.formSpouseName')}:</strong> {data.spouseName || 'N/A'}</div>
            </div>
          </section>
  
          {/* Address Details */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-black pb-1">
              {t('memberPortal.formSectionAddress')}
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold">{t('memberPortal.formPresentAddress')}</h3>
                <p>
                  {t('memberPortal.formVillage')}: {data.presentAddressVillage}, {t('memberPortal.formPostOffice')}: {data.presentAddressPost}, 
                  {t('memberPortal.formUpazila')}: {data.presentAddressUpazila}, {t('memberPortal.formDistrict')}: {data.presentAddressDistrict}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t('memberPortal.formPermanentAddress')}</h3>
                {data.isSameAddress ? (
                  <p>{t('memberPortal.formSameAsPresent')}</p>
                ) : (
                  <p>
                    {t('memberPortal.formVillage')}: {data.permanentAddressVillage}, {t('memberPortal.formPostOffice')}: {data.permanentAddressPost}, 
                    {t('memberPortal.formUpazila')}: {data.permanentAddressUpazila}, {t('memberPortal.formDistrict')}: {data.permanentAddressDistrict}
                  </p>
                )}
              </div>
            </div>
          </section>
  
          {/* Additional Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-black pb-1">
              {t('memberPortal.formSectionOther')}
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div><strong>{t('memberPortal.formNationality')}:</strong> {data.nationality}</div>
              <div><strong>{t('memberPortal.formReligion')}:</strong> {data.religion}</div>
              <div><strong>{t('memberPortal.formMaritalStatus')}:</strong> {data.maritalStatus}</div>
              <div><strong>{t('memberPortal.formGender')}:</strong> {data.gender}</div>
              <div><strong>{t('memberPortal.formPhone')}:</strong> {data.phone}</div>
              <div><strong>{t('memberPortal.formNid')}:</strong> {data.nid}</div>
              <div><strong>{t('memberPortal.formPassport')}:</strong> {data.passport || 'N/A'}</div>
              <div><strong>{t('memberPortal.formBloodGroup')}:</strong> {data.bloodGroup || 'N/A'}</div>
            </div>
          </section>
  
          {/* Nominee Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-black pb-1">
              {t('memberPortal.formNomineeInfo')}
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div><strong>{t('memberPortal.formNomineeName')}:</strong> {data.nomineeName}</div>
              <div><strong>{t('memberPortal.formNomineeRelationship')}:</strong> {data.nomineeRelationship}</div>
              <div><strong>{t('memberPortal.formNomineePhone')}:</strong> {data.nomineePhone}</div>
              <div><strong>{t('memberPortal.formNomineeAddress')}:</strong> {data.nomineeAddress}</div>
            </div>
          </section>
        </div>
  
        <div className="mt-16 text-sm">
          <div className="flex justify-between">
              <div className="w-1/3 text-center">
                  <p className="border-t border-black pt-2 mt-8">Applicant's Signature</p>
              </div>
              <div className="w-1/3 text-center">
                  <p className="border-t border-black pt-2 mt-8">Nominee's Signature</p>
              </div>
          </div>
        </div>
      </div>
    );
  };
