import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: { component: string } }
) {
    const { component } = await params;

    // Basic sanitization
    const safeComponent = component.replace(/[^a-zA-Z0-9_-]/g, '');

    const filePath = path.join(
        process.cwd(),
        'registry/open-source',
        `${safeComponent}.tsx`
    );

    if (!existsSync(filePath)) {
        return NextResponse.json({ error: 'Component not found.' }, { status: 404 });
    }

    try {
        const content = readFileSync(filePath, 'utf-8');
        return new NextResponse(content, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (err) {
        return NextResponse.json({ error: 'Error reading file.' }, { status: 500 });
    }
}