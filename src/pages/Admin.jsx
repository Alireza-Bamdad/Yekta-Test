import Navbar from "../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import "./Admin.css";

// دسته‌بندی‌های موجود
const categories = [
    "دانش و خرد",
    "شجاعت",
    "انسان‌دوستی",
    "عدالت",
    "اعتدال",
    "تعالی"
];

function Admin({ questions, setQuestions }) {
    const [text, setText] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddOrEditQuestion = () => {
        if (text.trim() !== "") {
            const newQuestion = {
                text,
                media,
                mediaType,
                category
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
            resetForm();
        } else {
            alert("لطفاً متن سوال را وارد کنید");
        }
    };

    const resetForm = () => {
        setText("");
        setMedia(null);
        setMediaType("");
        setCategory(categories[0]);
        setEditIndex(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.startsWith('image') ? 'image' : (file.type.startsWith('video') ? 'video' : '');
            if (fileType) {
                setMedia(URL.createObjectURL(file));
                setMediaType(fileType);
            } else {
                alert("فقط عکس یا ویدیو انتخاب کنید");
            }
        }
    };

    const handleDelete = (index) => {
        if (window.confirm("آیا از حذف این سوال اطمینان دارید؟")) {
            const updatedQuestions = [...questions];
            updatedQuestions.splice(index, 1);
            setQuestions(updatedQuestions);
            
            if (editIndex === index) {
                resetForm();
            }
        }
    };

    const handleEdit = (index) => {
        const question = questions[index];
        setText(question.text);
        setMedia(question.media);
        setMediaType(question.mediaType);
        setCategory(question.category || categories[0]);
        setEditIndex(index);
    };

    const handleCancel = () => {
        resetForm();
    };

    // فیلتر کردن سوالات براساس دسته‌بندی و جستجو
    const filteredQuestions = questions.filter((q) => {
        const matchesCategory = filter === "all" || q.category === filter;
        const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // تعداد سوالات هر دسته‌بندی
    const categoryCounts = categories.reduce((acc, cat) => {
        acc[cat] = questions.filter(q => q.category === cat).length;
        return acc;
    }, {});

    return (
        <div className="admin-container">
            
            <div className="admin-content">
                <div className="admin-sidebar">
                    <h3>دسته‌بندی‌ها</h3>
                    <ul className="category-list">
                        <li 
                            className={filter === "all" ? "active" : ""}
                            onClick={() => setFilter("all")}
                        >
                            همه سوالات <span>({questions.length})</span>
                        </li>
                        {categories.map((cat) => (
                            <li 
                                key={cat} 
                                className={filter === cat ? "active" : ""}
                                onClick={() => setFilter(cat)}
                            >
                                {cat} <span>({categoryCounts[cat] || 0})</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="admin-main">
                    <div className="admin-form">
                        <h2>{editIndex !== null ? "ویرایش سوال" : "اضافه کردن سوال جدید"}</h2>
                        
                        <div className="form-group">
                            <label>متن سوال:</label>
                            <textarea 
                                value={text} 
                                onChange={(e) => setText(e.target.value)} 
                                placeholder="متن سوال را وارد کنید"
                                rows="3"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>دسته‌بندی:</label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>تصویر/ویدیو (اختیاری):</label>
                            <input 
                                type="file" 
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {media && (
                            <div className="media-preview">
                                <h4>پیش‌نمایش:</h4>
                                {mediaType === "image" ? (
                                    <img src={media} alt="Preview" />
                                ) : (
                                    <video src={media} controls />
                                )}
                            </div>
                        )}

                        <div className="form-buttons">
                            <button 
                                type="button" 
                                className="btn-primary" 
                                onClick={handleAddOrEditQuestion}
                            >
                                {editIndex !== null ? "بروزرسانی سوال" : "اضافه کردن سوال"}
                            </button>
                            
                            {editIndex !== null && (
                                <button 
                                    type="button" 
                                    className="btn-cancel" 
                                    onClick={handleCancel}
                                >
                                    انصراف
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="questions-list">
                        <div className="list-header">
                            <h3>لیست سوالات {filter !== "all" ? filter : ""}</h3>
                            <div className="search-box">
                                <input 
                                    type="text" 
                                    placeholder="جستجو در سوالات..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        {filteredQuestions.length === 0 ? (
                            <div className="no-questions">
                                <p>هیچ سوالی یافت نشد!</p>
                            </div>
                        ) : (
                            filteredQuestions.map((q, index) => {
                                const originalIndex = questions.findIndex(
                                    (originalQ) => originalQ.text === q.text
                                );
                                
                                return (
                                    <div key={index} className={`question-card ${editIndex === originalIndex ? 'editing' : ''}`}>
                                        <div className="question-content">
                                            <div className="question-header">
                                                <h4>{q.text}</h4>
                                                <span className="question-category">{q.category || "بدون دسته‌بندی"}</span>
                                            </div>
                                            
                                            {q.media && (
                                                <div className="question-media">
                                                    {q.mediaType === "image" ? (
                                                        <img src={q.media} alt="question media" />
                                                    ) : (
                                                        <video src={q.media} controls />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="question-actions">
                                            <button 
                                                className="btn-edit"
                                                onClick={() => handleEdit(originalIndex)}
                                            >
                                                ویرایش
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => handleDelete(originalIndex)}
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;