package com.micro.aqs.service;

import com.micro.aqs.entities.Question;
import com.micro.aqs.entities.QuestionWrapper;
import com.micro.aqs.entities.Quiz;
import com.micro.aqs.entities.Response;
import com.micro.aqs.exception.QuestionNotFoundException;
import com.micro.aqs.repository.QuestionRepository;
import com.micro.aqs.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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


    public List<QuestionWrapper> getQuizQuestions(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(()->new QuestionNotFoundException("Quiz not found with id " + id));
        List<Question> questionsFromDB = quiz.getQuestions();
        List<QuestionWrapper> questionsForUser = new ArrayList<>();
        for(Question q:questionsFromDB){
            QuestionWrapper qw = new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
            questionsForUser.add(qw);

        }
        return questionsForUser;
    }

    public int calculateResult(int id, List<Response> responses) {
        Quiz quiz = quizRepository.findById(id).get();
        List<Question> questions = quiz.getQuestions();
        int i = 0;
        int right = 0;
        for(Response response:responses){
            if(response.getResponse().equals(questions.get(i).getRightAnswer())){
                right++;
            }
            i++;

        }
        return right;
    }
}
