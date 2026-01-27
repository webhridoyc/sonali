
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function ApplicationForm() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: t('formValidation.required') }),
    nameEn: z.string().min(1, { message: t('formValidation.required') }),
    fatherName: z.string().min(1, { message: t('formValidation.required') }),
    motherName: z.string().min(1, { message: t('formValidation.required') }),
    spouseName: z.string().optional(),
    
    presentAddressVillage: z.string().min(1, { message: t('formValidation.required') }),
    presentAddressPost: z.string().min(1, { message: t('formValidation.required') }),
    presentAddressUpazila: z.string().min(1, { message: t('formValidation.required') }),
    presentAddressDistrict: z.string().min(1, { message: t('formValidation.required') }),

    isSameAddress: z.boolean().default(false),

    permanentAddressVillage: z.string().optional(),
    permanentAddressPost: z.string().optional(),
    permanentAddressUpazila: z.string().optional(),
    permanentAddressDistrict: z.string().optional(),

    nationality: z.string().min(1, { message: t('formValidation.required') }),
    religion: z.string().min(1, { message: t('formValidation.required') }),
    maritalStatus: z.string().min(1, { message: t('formValidation.required') }),
    gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: t('formValidation.required') }) }),
    bloodGroup: z.string().optional(),
    
    phone: z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, { message: t('formValidation.phone') }),
    nid: z.string().regex(/^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/, { message: t('formValidation.nid') }),
    passport: z.string().optional(),

    photo: z.any().optional(),

    nomineeName: z.string().min(1, { message: t('formValidation.required') }),
    nomineeRelationship: z.string().min(1, { message: t('formValidation.required') }),
    nomineePhone: z.string().min(1, { message: t('formValidation.required') }),
    nomineeAddress: z.string().min(1, { message: t('formValidation.required') }),
    nomineePhoto: z.any().optional(),
  }).refine(data => {
      if (!data.isSameAddress) {
          return !!data.permanentAddressVillage && !!data.permanentAddressPost && !!data.permanentAddressUpazila && !!data.permanentAddressDistrict;
      }
      return true;
  }, {
    message: t('formValidation.permAddress'),
    path: ["permanentAddressVillage"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
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
    if (isSameAddress) {
      form.setValue('permanentAddressVillage', form.getValues('presentAddressVillage'));
      form.setValue('permanentAddressPost', form.getValues('presentAddressPost'));
      form.setValue('permanentAddressUpazila', form.getValues('presentAddressUpazila'));
      form.setValue('permanentAddressDistrict', form.getValues('presentAddressDistrict'));
    } else {
        form.setValue('permanentAddressVillage', '');
        form.setValue('permanentAddressPost', '');
        form.setValue('permanentAddressUpazila', '');
        form.setValue('permanentAddressDistrict', '');
    }
  }, [isSameAddress, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // NOTE: In a real app, you would handle file uploads to a storage service.
    // Here we are just logging the values for demonstration.
    const result = await applyForMembership(values);
    if (result.success) {
      toast({
        title: t('memberPortal.submitSuccess'),
        description: t('memberPortal.submitSuccessDesc'),
      });
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
  );
}
