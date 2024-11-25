"use client"
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddACategory from "@/components/AddACategory";
import UpdateCategory from "@/components/UpdateCategory";
type Category = {
  id: number;
  title: string;
  description?: string; // description zorunlu değil
};


export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");

      // API yanıtını kontrol et
      if (response.data && typeof response.data === 'object') {
        setCategories(response.data);
      } else {
        console.error("Beklenmeyen veri formatı", response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("fetch kategori hatası", axiosError.response ? axiosError.response.data : axiosError.message);
    }
  }
  async function deleteCategory(id: string) {
    try {
      await axios.delete(`/api/categories/${id}`)
      fetchCategories()
    } catch (error) {
      console.error("fetch categori delete hatası", error)
    }

  }
  useEffect(() => {
    fetchCategories();
  }, [])
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-4 font-semibold mb-8">Categories {selectedCategory} </h1>

      <AddACategory fetchCategories={fetchCategories} />
      {selectedCategory && (
        <UpdateCategory
        category={selectedCategory}
        fetchCategories={fetchCategories}
        isOpen={isUpdateModalOpen}
        onClose={()=>setIsUpdateModalOpen(false)}
        />
      )}
      <Table>
        <TableCaption>A list of your recent category.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>description</TableHead>
            <TableHead className="text-right">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className="flex flex-row gap-2 text-right">
                <Button onClick={() => {setSelectedCategory(category.id); setIsUpdateModalOpen(true)}}>Edit</Button>
                <Button onClick={() => deleteCategory(String(category.id))} variant={"destructive"}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
