"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
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
type Category = {
  id: number;
  title: string;
  description?: string; // description zorunlu değil
};


export default function Home() {
const [categories, setCategories] = useState<Category[]>([])

  async function  fetchCategories() {
    try {
      const response = await axios.get("/api/categories")
      setCategories(response.data)
    } catch (error) {
      console.error("fetch categori hatası",error)
    }
  }

  useEffect(() => {
    fetchCategories();
  },[])
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-4 font-semibold mb-8">Categories</h1>
    <Button variant={"default"}>Add a  Category</Button>
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
              <Button>Edit</Button>
              <Button variant={"destructive"}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}