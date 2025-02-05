import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Params = Promise<{ postId: string }>;

export async function DELETE(req: Request, segmentData: { params: Params }) {
    const params = await segmentData.params;
    const id = params.postId;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
 try {

        const deletedQRCode = await prisma.post.delete({
            where: { id ,userId:userId},
        });

        return NextResponse.json(deletedQRCode);
    } catch (error) {
        console.error("Error deleting QR code:", error);
        return NextResponse.json(
            { error: "Failed to delete QR code" },
            { status: 500 }
        );
    }
}
