import AdminNav from "@/app/components/AdminNav";
import CreateCategoryForm from "@/app/components/CreateCategoryForm";

export default function CreateCategory() {
    return (
        <div className="w-full">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 mb-24 text-black">
                <div className="mb-5">
                    <h1 className="font-semibold text-lg md:text-xl">Create Post</h1>
                </div>
                <CreateCategoryForm />
            </div>
        </div>
    );
}