export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
            <h1 className="font-hero text-4xl font-bold text-ink sm:text-5xl md:text-6xl">
                404
            </h1>
            <p className="max-w-md text-sm leading-7 text-muted sm:text-base sm:leading-8">
                ขอโทษนะ, เราไม่พบหน้าที่คุณกำลังมองหา. ลองตรวจสอบ URL หรือกลับไปที่หน้าแรกของเรา.
            </p>
            <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:px-6"
            >
                กลับไปที่หน้าแรก
            </a>
        </div>
    );
}