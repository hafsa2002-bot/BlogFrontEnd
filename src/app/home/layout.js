import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
    return (
        <div className="bg-[#FAF7F0] pt-28">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}