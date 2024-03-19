import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Валидируем данные
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Проверяем существует ли уже пользователь
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json(
      { error: "User or email already exist" },
      { status: 400 }
    );
  }

  // Хэшируем пароль
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
        name: body.name,
        email: body.email,
        hashedPassword
    }
  })

  return NextResponse.json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    password: body.password
  })
}
