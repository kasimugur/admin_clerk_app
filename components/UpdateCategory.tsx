'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
})

interface UpdateCategoryProps {
  fetchCategories: () => void;
  isOpen: boolean;
  onClose: () => void;
  category: { id: string, title: string, description: string }
}

export default function UpdateCategory({ category, fetchCategories,
  isOpen, onClose }: UpdateCategoryProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: category.title,
      description: category.description,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/categories/${category.id}`,
        { title: values.title, description: values.description })
      fetchCategories()
      onClose();
    } catch (error) {
      // const axiosError = error as AxiosError;
      if (axios.isAxiosError(error)) {
        console.error("onSubmit hatası", error.response ? error.response.data : error.message);
      } else {
        console.error("Beklenmeyen hata:", error);
      }
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit A New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
