declare const window: Window &
    typeof globalThis & {
    cloudinary: {
        createUploadWidget: (p: {}, p1: (error: any, result: any) => void) => any
    }
}

export class UploadImageWidget {

    public static upload(cloudinaryRef: any, widgetRef: any) {
        return new Promise((resolve, reject) => {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
                cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
                uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            }, (error: any, result: { event: string; info: { secure_url: any; }; }) => {
                if (!error && result && result.event === "success") {
                    if (result.info.secure_url) {
                        resolve(result.info.secure_url.toString());
                    } else {
                        reject('Unable to upload Image');
                    }
                }
            });
        })
    }
}