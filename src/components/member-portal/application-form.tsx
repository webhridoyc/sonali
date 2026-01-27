
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
    if (form.formState.isDirty) {
        const subscription = form.watch((value, { name, type }) => {
            if (name === 'isSameAddress' && type === 'change') {
                const presentAddress = {
                    village: value.presentAddressVillage,
                    post: value.presentAddressPost,
                    upazila: value.presentAddressUpazila,
                    district: value.presentAddressDistrict,
                };
                if (value.isSameAddress) {
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
            }
        });
        return () => subscription.unsubscribe();
    }
  }, [form, isSameAddress]);

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


const ApplicationPDF = ({ data }: { data: FormValues; t: (key: string) => string }) => {
  return (
    <div className="p-12 bg-white text-black font-body text-base" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <div className="text-center">
        <p>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত</p>
        <h1 className="text-2xl font-bold mt-2">সোনালী সকাল সমবায় সমিতি</h1>
        <p className="text-sm">স্থাপিতঃ ২০২২ইং | গভঃ রেজিঃ নং-০০০৩৪</p>
        <p className="text-sm">বাইদগাঁও, পাগলা বাজার, কবিরপুর, আশুলিয়া, সাভার, ঢাকা।</p>
      </div>

      {/* Title */}
      <div className="text-center my-6">
        <h2 className="text-xl font-bold inline-block border-2 border-black px-4 py-1">ভর্তি ফরম</h2>
        <p className="mt-1 text-sm">সদস্য/সদস্যা পদের জন্য আবেদন।</p>
      </div>
      
      <p className="text-right text-sm">ক্রমিক নং: _________________</p>
      
      {/* Preamble */}
      <p className="mt-4 text-sm leading-relaxed">
          আমি নিম্ন স্বাক্ষরকারী অত্র সমিতির গঠনতন্ত্র অনুযায়ী সমিতির আদর্শ, উদ্দেশ্য ও বিধি-বিধান মান্য করিয়া চলিব এবং সমিতির গঠনতন্ত্র বিরোধী যে কোন কাজ হইতে বিরত থাকিব। আমি আরও প্রতিজ্ঞা করিতেছি যে, সমিতির বিধি-বিধান যখন যাহা প্রবর্তিত হইবে, তাহাও মানিয়া চলিব এবং সাপ্তাহিক/ মাসিক/ টাকা নিয়মিত ভাবে পরিশোধ করিতে বাধ্য থাকিব। এমতাবস্থায়, অত্র সমিতির সদস্যপদ গ্রহণের জন্য আবেদন করিলাম।
      </p>

      {/* Main form body */}
      <div className="mt-6 space-y-4 text-sm">
        <h3 className="font-bold text-base -mb-2">ব্যক্তিগত তথ্য:</h3>
        
        <div className="flex items-baseline">
          <span className="flex-shrink-0">১. আবেদনকারীর নাম:</span>
          <span className="border-b border-black flex-grow ml-2 text-left">{data.name}</span>
          <span className="flex-shrink-0 ml-4">Full name (Capital Letter):</span>
          <span className="border-b border-black flex-grow ml-2 text-left">{data.nameEn}</span>
        </div>
        
        <div className="flex items-baseline">
          <span className="flex-shrink-0">২. পিতার নাম:</span>
          <span className="border-b border-black flex-grow ml-2 text-left">{data.fatherName}</span>
        </div>

        <div className="flex items-baseline">
          <span className="flex-shrink-0">৩. মাতার নাম:</span>
          <span className="border-b border-black flex-grow ml-2 text-left">{data.motherName}</span>
        </div>

        <div className="flex items-baseline">
          <span className="flex-shrink-0">৪. স্বামী/স্ত্রীর নাম:</span>
          <span className="border-b border-black flex-grow ml-2 text-left">{data.spouseName || ''}</span>
        </div>

        <div>
          <p>৫. বর্তমান ঠিকানা: গ্রাম/মহল্লা: <span className="font-sans border-b border-black px-2">{data.presentAddressVillage}</span>, ইউনিয়ন/পৌরসভা: <span className="border-b border-black">_________________</span>, পো: <span className="font-sans border-b border-black px-2">{data.presentAddressPost}</span>, থানা: <span className="font-sans border-b border-black px-2">{data.presentAddressUpazila}</span>, জেলা: <span className="font-sans border-b border-black px-2">{data.presentAddressDistrict}</span></p>
        </div>
        
        <div>
          <p>৬. স্থায়ী ঠিকানা: {data.isSameAddress ? 'বর্তমান ঠিকানার অনুরূপ' : `গ্রাম/মহল্লা: ${data.permanentAddressVillage}, ইউনিয়ন/পৌরসভা: _________________, পো: ${data.permanentAddressPost}, থানা: ${data.permanentAddressUpazila}, জেলা: ${data.permanentAddressDistrict}`}</p>
        </div>
        
        <div className="flex items-baseline">
          <span className="flex-shrink-0">৭. জাতীয়তা:</span>
          <span className="border-b border-black w-24 ml-2">{data.nationality}</span>
          <span className="ml-4 flex-shrink-0">ধর্ম:</span>
          <span className="border-b border-black w-24 ml-2">{data.religion}</span>
          <span className="ml-4 flex-shrink-0">মোবাইল নম্বর:</span>
          <span className="border-b border-black flex-grow ml-2">{data.phone}</span>
        </div>

        <div className="flex items-baseline">
          <span className="flex-shrink-0">৮. বৈবাহিক অবস্থা:</span>
          <span className="border-b border-black w-24 ml-2">{data.maritalStatus}</span>
          <span className="ml-4 flex-shrink-0">লিঙ্গ:</span>
          <span className="border-b border-black w-24 ml-2">{data.gender}</span>
          <span className="ml-4 flex-shrink-0">রক্তের গ্রুপ:</span>
          <span className="border-b border-black flex-grow ml-2">{data.bloodGroup || ''}</span>
        </div>
        
        <div className="flex items-baseline">
          <span className="flex-shrink-0">৯. জাতীয় পরিচয়পত্র:</span>
          <span className="border-b border-black flex-grow ml-2">{data.nid}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <div className="flex items-baseline w-1/2">
              <span className="flex-shrink-0">পাসপোর্ট নম্বর:</span>
              <span className="border-b border-black flex-grow ml-2">{data.passport || ''}</span>
          </div>
          <div className="flex items-baseline w-1/3">
              <span className="flex-shrink-0">আবেদনকারীর স্বাক্ষর:</span>
              <span className="border-b border-black flex-grow ml-2"></span>
          </div>
        </div>

        <h3 className="font-bold text-base pt-4 -mb-2">নমিনীর তথ্য:</h3>
        <div className="flex items-baseline">
          <span className="flex-shrink-0">নমিনীর নাম:</span>
          <span className="border-b border-black flex-grow ml-2">{data.nomineeName}</span>
        </div>
        <div className="flex items-baseline">
          <span className="flex-shrink-0">সম্পর্ক:</span>
          <span className="border-b border-black w-1/3 ml-2">{data.nomineeRelationship}</span>
          <span className="ml-4 flex-shrink-0">মোবাইল নম্বর:</span>
          <span className="border-b border-black flex-grow ml-2">{data.nomineePhone}</span>
        </div>
        <p>ঠিকানা: গ্রাম/মহল্লা: <span className="border-b border-black">{data.nomineeAddress}</span>, ইউনিয়ন/পৌরসভা: <span className="border-b border-black">_________________</span>, পোস্ট: <span className="border-b border-black">_________________</span>, থানা: <span className="border-b border-black">_________________</span>, জেলা: <span className="border-b border-black">_________________</span></p>
        <div className="flex justify-end">
          <div className="flex items-baseline w-1/3">
              <span className="flex-shrink-0">নমিনীর স্বাক্ষর:</span>
              <span className="border-b border-black flex-grow ml-2"></span>
          </div>
        </div>
      </div>
      
      {/* Signature Footer */}
      <div className="flex justify-between mt-24 text-center text-sm">
          <div className="pt-8"><p className="border-t border-black px-8">ফিল্ড অফিসার</p></div>
          <div className="pt-8"><p className="border-t border-black px-8">যাচাইকারী</p></div>
          <div className="pt-8"><p className="border-t border-black px-8">ম্যানেজার</p></div>
      </div>

    </div>
  );
};
