import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import "./Admin.css";

function Admin({ questions, setQuestions }) {
    const [text, setText] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState("");
    const [editIndex, setEditIndex] = useState(null); // برای ویرایش سوال

    const handleAddOrEditQuestion = () => {
        if (text.trim() !== "") {
            const newQuestion = {
                text,
                media,
                mediaType
            };
            if (editIndex !== null) {
                // ویرایش سوال
                const updatedQuestions = [...questions];
                updatedQuestions[editIndex] = newQuestion;
                setQuestions(updatedQuestions);
                setEditIndex(null);
            } else {
                // اضافه کردن سوال جدید
                setQuestions([...questions, newQuestion]);
            }
            // ریست کردن فرم
            setText("");
            setMedia(null);
            setMediaType("");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.startsWith('image') ? 'image' : (file.type.startsWith('video') ? 'video' : '');
            if (fileType) {
                setMedia(URL.createObjectURL(file));
                setMediaType(fileType);
            } else {
                alert("فقط عکس یا ویدیو انتخاب کن");
            }
        }
    };

    const handleDelete = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
        if (editIndex === index) {
            // اگر سوالی که در حال ویرایش بود پاک شد، فرم ریست بشه
            setText("");
            setMedia(null);
            setMediaType("");
            setEditIndex(null);
        }
    };

    const handleEdit = (index) => {
        const question = questions[index];
        setText(question.text);
        setMedia(question.media);
        setMediaType(question.mediaType);
        setEditIndex(index);
    };

    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-form">
                <h2>{editIndex !== null ? "ویرایش سوال" : "اضافه کردن سوال"}</h2>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="متن سوال"
                />
                <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />
                <button type="button" onClick={handleAddOrEditQuestion}>
                    {editIndex !== null ? "بروزرسانی" : "اضافه کردن"}
                </button>

                {media && (
                    <div style={{ marginTop: '10px' }}>
                        {mediaType === "image" ? (
                            <img src={media} alt="Preview" width="200" />
                        ) : (
                            <video src={media} controls width="250" />
                        )}
                    </div>
                )}
            </div>

            <div className="questions-list">
                <h3>لیست سوالات</h3>
                {questions.map((q, index) => (
                    <div key={index} className="question-card">
                        <h4>{q.text}</h4>
                        {q.media && (
                            <div>
                                {q.mediaType === "image" ? (
                                    <img src={q.media} alt="question media" width="200" />
                                ) : (
                                    <video src={q.media} controls width="250" />
                                )}
                            </div>
                        )}
                        <button onClick={() => handleEdit(index)}>ویرایش</button>
                        <button onClick={() => handleDelete(index)}>حذف</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
