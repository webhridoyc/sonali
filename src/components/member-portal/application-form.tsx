"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { applyForMembership } from '@/lib/actions';

export function ApplicationForm() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: t('formValidation.required') }),
    nid: z.string().regex(/^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/, {
      message: t('formValidation.nid'),
    }),
    phone: z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, {
      message: t('formValidation.phone'),
    }),
    address: z.string().min(1, { message: t('formValidation.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nid: '',
      phone: '',
      address: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        description: t('memberPortal.submitErrorDesc'),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('memberPortal.formName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('memberPortal.formName')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('memberPortal.formNid')}</FormLabel>
              <FormControl>
                <Input placeholder="xxxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('memberPortal.formPhone')}</FormLabel>
              <FormControl>
                <Input placeholder="01xxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('memberPortal.formAddress')}</FormLabel>
              <FormControl>
                <Input placeholder={t('memberPortal.formAddress')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? t('memberPortal.submitting') : t('memberPortal.submit')}
        </Button>
      </form>
    </Form>
  );
}
