import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props{
    params: {
        id: string
    }
}

export async function GET(request:NextRequest, {params: {id} }:Props){
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })

   if(!user){
    return NextResponse.json({error: "User not found"}, {status: 404})
   }
   return NextResponse.json(user)
};


export async function PUT(request:NextRequest, {params: {id} }:Props){
    const body = await request.json() 
    //валидация данных
    //если имя пользователя не было передано, возвращаем 400
    const validation = schema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    } 

    //запросить у бд пользователя с нужным id
    //если пользователь не был найден, возвращаем 404
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    });

    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    //иначе обновляем пользователя в бд
    // и возвращаем обновденного пользователя

    const updateUser = await prisma.user.update({
        where: {id: user.id},
        data: {
            name: body.name,
            email: body.email
        }
    });
    return NextResponse.json(updateUser, {status: 201})
}


export async function DELETE(request:NextRequest, {params: {id} }:Props){
    //запрашиваем из бд пользователя с нужным id
    // если пользователя не существует то возвращаем 404
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    // иначе удаляем пользователя и возврааем статус 200
    const deleteUser = await prisma.user.delete({
        where: {id: user.id}
    })

    return NextResponse.json(deleteUser,{status: 200})
}
