package com.micro.aqs.service;

import com.micro.aqs.entities.Question;
import com.micro.aqs.entities.Quiz;
import com.micro.aqs.repository.QuestionRepository;
import com.micro.aqs.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    @Autowired
    QuizRepository quizRepository;
    @Autowired
    QuestionRepository questionRepository;
    public String createQuiz(String category, int numQ,String title){
        List<Question> questions = questionRepository.findRandomQuestionsByCategory(category,numQ);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizRepository.save(quiz);
        return "Success";

    }


}
