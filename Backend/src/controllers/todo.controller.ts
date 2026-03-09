import type { Request, Response } from "express";
import { z } from "zod";
import Todo from "../models/todo.js";
import { createTodoSchema, updateTodoSchema } from "../DTOs/dtos.js";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getTodosbyid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(Number(id));
    
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const validatedData = createTodoSchema.parse(req.body);
    const todo = await Todo.create(validatedData);
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: error.issues 
      });
    }
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const updateTodobyid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateTodoSchema.parse(req.body);
    
    const todo = await Todo.findByPk(Number(id));
    
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    
    await todo.update(validatedData);
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: error.issues 
      });
    }
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const deleteTodobyid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(Number(id));
    
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    
    await todo.destroy();
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
