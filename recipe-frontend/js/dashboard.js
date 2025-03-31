// ✅ Firebase Config Import कर
import { storage } from "./firebase-config.js";  
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

// ✅ Recipe Form Submit Event
document.getElementById("addRecipeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const recipeName = document.querySelector('input[name="recipeName"]').value;
    const recipeDescription = document.querySelector('textarea[name="recipeDescription"]').value;
    const fileInput = document.querySelector('input[type="file"]');
    const imageFile = fileInput.files[0];

    if (!recipeName || !recipeDescription || !imageFile) {
        alert("All fields are required!");
        return;
    }

    const storageRef = ref(storage, `recipes/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on("state_changed",
        (snapshot) => {
            console.log("Uploading...");
        },
        (error) => {
            console.error("❌ Upload Error:", error);
            alert("Upload failed!");
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("✅ Image Uploaded:", downloadURL);
            
            document.getElementById("uploadedImage").src = downloadURL;
            document.getElementById("uploadedImage").style.display = "block";

            try {
                const response = await fetch("http://127.0.0.1:5012/api/recipe/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        recipeName,
                        recipeDescription,
                        imageUrl: downloadURL
                    })
                });

                const data = await response.json();
                console.log("✅ Server Response:", data);

                if (response.ok) {
                    alert("Recipe Added Successfully!");
                    window.location.reload();
                } else {
                    throw new Error(data.error || "Failed to add recipe!");
                }
            } catch (error) {
                console.error("❌ Error:", error);
                alert("Error adding recipe.");
            }
        }
    );
});