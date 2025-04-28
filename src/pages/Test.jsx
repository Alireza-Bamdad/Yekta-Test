import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import "./Test.css";

function Test({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const currentAnswer = answers[currentQuestionIndex];
    const isAnswered = currentAnswer !== undefined;

    const handleAnswerChange = (score) => {
        setAnswers({
            ...answers,
            [currentQuestionIndex]: score
        });
    };

    const nextQuestion = () => {
        if (isAnswered) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                calculateResult();
                setShowResult(true);
            }
        } else {
            alert("لطفاً به این سوال جواب دهید.");
        }
    };
    const calculateResult = () => {
        // دسته‌بندی سوالات
        const categories = {
            "دانش و خرد": [0, 1, 2, 3, 4],
            "شجاعت": [5, 6, 7, 8],
            "انسان‌دوستی": [9, 10, 11],
            "عدالت": [12, 13, 14],
            "اعتدال": [15, 16, 17, 18],
            "تعالی": [19, 20, 21, 22, 23]
        };
    
        // محاسبه امتیازات هر دسته
        const categoryScores = {};
        Object.keys(categories).forEach(category => {
            categoryScores[category] = categories[category].reduce((sum, qIndex) => {
                return sum + (answers[qIndex] || 0);
            }, 0);
        });
    
        // تجزیه و تحلیل هر دسته
        const categoryResults = {};
        Object.entries(categoryScores).forEach(([category, score]) => {
            const maxScore = categories[category].length * 5;
            const result = score >= maxScore * 0.8 ? "قوی" :
                          score >= maxScore * 0.5 ? "متوسط" : 
                          "ضعیف";
    
            categoryResults[category] = {
                score,
                result,
                interpretation: getCategoryInterpretation(category, result)
            };
        });
    
        setResult(categoryResults);
    };
    
    const getCategoryInterpretation = (category, result) => {
        const categoryInterpretations = {
            "دانش و خرد": {
                "قوی": "شما فردی کنجکاو و عاشق یادگیری هستید.",
                "متوسط": "شما در یادگیری و جستجوی اطلاعات قوی هستید اما می‌توانید بیشتر تلاش کنید.",
                "ضعیف": "شما نیاز به تقویت کنجکاوی و دیدگاه وسیع‌تر دارید."
            },
            "شجاعت": {
                "قوی": "شما فردی شجاع و با اراده هستید، هیچ چیزی نمی‌تواند شما را متوقف کند.",
                "متوسط": "شما در موقعیت‌های چالش‌برانگیز از خود شجاعت نشان می‌دهید، اما در برخی موارد می‌توانید پیشرفت کنید.",
                "ضعیف": "شما باید شجاعت بیشتری در مواجهه با چالش‌ها و ترس‌ها از خود نشان دهید."
            },
            "انسان‌دوستی": {
                "قوی": "شما فردی مهربان و اجتماعی هستید، روابط خوبی با دیگران برقرار می‌کنید.",
                "متوسط": "شما از روابط اجتماعی لذت می‌برید، اما گاهی اوقات می‌توانید بیشتر به دیگران توجه کنید.",
                "ضعیف": "شما باید در روابط انسانی و همدلی خود کار کنید."
            },
            "عدالت": {
                "قوی": "شما فردی منصف و تیمی هستید که همیشه به حقوق دیگران احترام می‌گذارید.",
                "متوسط": "شما گاهی اوقات انصاف را رعایت می‌کنید، اما باید روی حفظ آن در شرایط مختلف تمرکز کنید.",
                "ضعیف": "شما باید عدالت را در روابط و تصمیم‌گیری‌های خود بیشتر رعایت کنید."
            },
            "اعتدال": {
                "قوی": "شما فردی متعادل و آرام هستید و می‌توانید هیجانات خود را کنترل کنید.",
                "متوسط": "شما گاهی اوقات کنترل احساسات خود را از دست می‌دهید، اما به طور کلی قادر به تنظیم آن‌ها هستید.",
                "ضعیف": "شما باید در کنترل احساسات و واکنش‌های خود تمرکز بیشتری داشته باشید."
            },
            "تعالی": {
                "قوی": "شما فردی خوشبین، شاد و با دیدگاه مثبت به زندگی هستید.",
                "متوسط": "شما جنبه‌های مثبت زندگی را درک می‌کنید، اما گاهی اوقات می‌توانید بیشتر از آنها بهره ببرید.",
                "ضعیف": "شما باید روی خوش‌بینی و قدردانی از زیبایی‌ها در زندگی خود کار کنید."
            }
        };
    
        return categoryInterpretations[category][result];
    };
    
    

    const restartTest = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setResult(null);
        setShowResult(false);
    };

    return (
        <div className="test-container">
            <Navbar />
            {showResult ? (
    <div className="result-container">
        <h2>نتیجه آزمون توانمندی‌های منش (VIA-IS)</h2>
        {Object.entries(result).map(([category, { score, result, interpretation }]) => (
            <div key={category} className="category-result">
                <h3>{category}</h3>
                <p>{interpretation}</p>
                <p>امتیاز: {score}</p>
                {result === "قوی" && (
                    <p>شما این خصوصیت را به خوبی دارید. افراد معروفی مانند [افراد معروف] این ویژگی را دارند.</p>
                )}
                {result === "ضعیف" && (
                    <p>شما می‌توانید روی تقویت این خصوصیت کار کنید. شغل‌هایی مانند [شغل‌های مناسب] برای شما مناسب خواهند بود.</p>
                )}
            </div>
        ))}
        <button className="restart-button" onClick={restartTest}>
            انجام مجدد آزمون
        </button>
    </div>
) : (
    <div className="question-container">
        <div className="progress-info">
            سوال {currentQuestionIndex + 1} از {questions.length}
        </div>
        <h3>{questions[currentQuestionIndex].text}</h3>
        <div className="options">
            <label>
                <input 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`}
                    value={5} 
                    checked={currentAnswer === 5}
                    onChange={() => handleAnswerChange(5)} 
                /> کاملاً شبیه من
            </label>
            <label>
                <input 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`}
                    value={4} 
                    checked={currentAnswer === 4}
                    onChange={() => handleAnswerChange(4)} 
                /> شبیه من
            </label>
            <label>
                <input 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`}
                    value={3} 
                    checked={currentAnswer === 3}
                    onChange={() => handleAnswerChange(3)} 
                /> نظری ندارم
            </label>
            <label>
                <input 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`}
                    value={2} 
                    checked={currentAnswer === 2}
                    onChange={() => handleAnswerChange(2)} 
                /> برعکس من
            </label>
            <label>
                <input 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`}
                    value={1} 
                    checked={currentAnswer === 1}
                    onChange={() => handleAnswerChange(1)} 
                /> کاملاً برعکس من
            </label>
        </div>
        <button className="next-button" onClick={nextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "بعدی" : "پایان آزمون"}
        </button>
    </div>
)}

        </div>
    );
}

export default Test;