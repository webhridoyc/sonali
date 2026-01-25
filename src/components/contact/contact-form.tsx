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
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/lib/actions';

export function ContactForm() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: t('formValidation.required') }),
    phone: z.string().min(1, { message: t('formValidation.required') }),
    inquiry: z.string().min(1, { message: t('formValidation.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      inquiry: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitInquiry(values);
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
              <FormLabel>{t('contact.formName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact.formName')} {...field} />
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
              <FormLabel>{t('contact.formPhone')}</FormLabel>
              <FormControl>
                <Input placeholder="01xxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.formInquiry')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('contact.formInquiry')} className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? t('contact.sending') : t('contact.send')}
        </Button>
      </form>
    </Form>
  );
}
