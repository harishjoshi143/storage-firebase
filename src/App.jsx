import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { storage, db } from "./Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [show, setShow] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleImageUpload(file) {
    const imageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  }

  async function formSubmit(e) {
    e.preventDefault();
    setUploading(true);

    try {
      const imageUrl = await handleImageUpload(data.image);
      await addDoc(collection(db, "users"), {
        name: data.name,
        email: data.email,
        imageUrl: imageUrl,
      });
      setShow(true);
      setData({ name: "", email: "", image: null });
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Form onSubmit={formSubmit} className="container">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleInputChange}
            value={data.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            value={data.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" name="file" onChange={handleFileChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" width={200} />}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </Button>
        {show && (
          <p style={{ marginTop: "20px" }}>Data submitted successfully!</p>
        )}
      </Form>
    </>
  );
}

export default App;
