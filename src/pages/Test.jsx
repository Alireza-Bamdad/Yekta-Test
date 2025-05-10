import Navbar from "../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import "./Test.css";

function Test({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentAnswer = answers[currentQuestionIndex];
    const isAnswered = currentAnswer !== undefined;

    
 
    useEffect(() => {
        // اسکرول به بالای صفحه هنگام تغییر سوال
        window.scrollTo(0, 0);
    }, [currentQuestionIndex, showResult]);

    const handleAnswerChange = (score) => {
        setAnswers({
            ...answers,
            [currentQuestionIndex]: score
        });
    };

    const nextQuestion = () => {
        if (isAnswered) {
            setIsTransitioning(true);
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    calculateResult();
                    setShowResult(true);
                }
                setIsTransitioning(false);
            }, 300);
        } else {
            alert("لطفاً به این سوال جواب دهید.");
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setIsTransitioning(false);
            }, 300);
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
            const percentScore = (score / maxScore) * 100;
            const result = percentScore >= 80 ? "قوی" :
                          percentScore >= 50 ? "متوسط" : 
                          "ضعیف";
    
            categoryResults[category] = {
                score,
                maxScore,
                percentScore,
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
        setIsTransitioning(true);
        setTimeout(() => {
            setAnswers({});
            setCurrentQuestionIndex(0);
            setResult(null);
            setShowResult(false);
            setIsTransitioning(false);
        }, 300);
    };

    // ایجاد نوار پیشرفت
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="test-container">
            <div className={`content-wrapper ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                {showResult ? (
                    <div className="result-container">
                        <h2>نتیجه آزمون یکتا</h2>
                        <p className="result-description">
                            این آزمون بر اساس مدل روانشناسی مثبت‌گرا، توانمندی‌های منش شما را در شش دسته اصلی ارزیابی می‌کند.
                        </p>
                        
                        <div className="result-summary">
                            {Object.entries(result).map(([category, { score, maxScore, percentScore, result: categoryResult, interpretation }]) => (
                                <div key={category} className={`category-result ${categoryResult.toLowerCase()}`}>
                                    <h3>{category}</h3>
                                    <div className="score-bar-container">
                                        <div className="score-bar" style={{ width: `${percentScore}%` }}></div>
                                        <span className="score-percentage">{Math.round(percentScore)}%</span>
                                    </div>
                                    <p className="interpretation">{interpretation}</p>
                                    
                                    {categoryResult === "قوی" }
                                    
                                    {categoryResult === "ضعیف" }
                                </div>
                            ))}
                        </div>
                        
                        <div className="action-buttons">
                            <button className="primary-button" onClick={restartTest}>
                                انجام مجدد آزمون
                            </button>
                            <button className="secondary-button" onClick={() => window.print()}>
                                چاپ نتایج
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="question-container">
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <div className="progress-info">
                                <span>سوال {currentQuestionIndex + 1} از {questions.length}</span>
                                <span>{Math.round(progressPercentage)}%</span>
                            </div>
                        </div>

                        <div className="question-content">
                            <h3 className="question-text">{questions[currentQuestionIndex].text}</h3>
                            
                            <div className="options">
                                {[
                                    { value: 5, label: "کاملاً شبیه من" },
                                    { value: 4, label: "شبیه من" },
                                    { value: 3, label: "نظری ندارم" },
                                    { value: 2, label: "برعکس من" },
                                    { value: 1, label: "کاملاً برعکس من" }
                                ].map((option) => (
                                    <label key={option.value} className={`option-label ${currentAnswer === option.value ? 'selected' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name={`question-${currentQuestionIndex}`}
                                            value={option.value} 
                                            checked={currentAnswer === option.value}
                                            onChange={() => handleAnswerChange(option.value)} 
                                        />
                                        <span className="radio-custom"></span>
                                        <span className="option-text">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="navigation-buttons">
                            {currentQuestionIndex > 0 && (
                                <button className="secondary-button" onClick={previousQuestion}>
                                    قبلی
                                </button>
                            )}
                            <button className="primary-button" onClick={nextQuestion}>
                                {currentQuestionIndex < questions.length - 1 ? "بعدی" : "مشاهده نتایج"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Test;