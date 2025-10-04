import { UploadButton } from "@uploadthing/react";
import { PlusCircle } from "lucide-react";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const UploadZone = ({setValue}:{setValue:any}) => {
    return (
        <>
            <UploadButton <ourFileRouter>
                content={{
                    button: (
                        <div className="flex gap-3">
                            <PlusCircle className="h-4 w-4 text-white" />
                            <span className="text-[12px]">Add Cover Image</span>
                        </div>
                    ),
                }}
                appearance={{
                    allowedContent: {
                        display: "none",
                    },
                }}
                className="mt-4 ut-button:bg-black ut-button:ut-readying:bg-black"
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                    console.log("Files: ", res)
                    if (res && res[0]) {
                        setValue("cover", res[0].url);
                    }
                    console.log("Upload complete!");

                }}
                onUploadError={(error: any) => {
                    // Do something with the error.
                    console.log("Upload ERROR: ", error.message);
                }} />

        </>
    );
}

export default UploadZone;
