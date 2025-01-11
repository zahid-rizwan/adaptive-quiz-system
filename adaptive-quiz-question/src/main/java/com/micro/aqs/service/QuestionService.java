package com.micro.aqs.service;

import com.micro.aqs.entities.Question;
import com.micro.aqs.exception.QuestionNotFoundException;
import com.micro.aqs.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;
    public  List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }
    public Question addQuestion(Question question){
        return questionRepository.save(question);
    }

    public Question getQuestionBtId(int questionId) {
        return questionRepository.findById(questionId).orElseThrow(()->new QuestionNotFoundException("Question not found with the id " + questionId));
    }


    public Question updateQuestion(Question updatedQuestion,int questionId) {
//        Optional<Question> question = questionRepository.findById(questionId);
//        return question.map(question1 -> {
//            question1.setQuestionTitle(updatedQuestion.getQuestionTitle());
//            question1.setOption1(updatedQuestion.getOption1());
//            question1.setOption2(updatedQuestion.getOption2());
//            question1.setOption3(updatedQuestion.getOption3());
//            question1.setOption4(updatedQuestion.getOption4());
//
//            return questionRepository.save(question1);
//        });
        Question qus = questionRepository.findById(questionId)
                .orElseThrow(()->new QuestionNotFoundException("Question not found + " + questionId));
        qus.setQuestionTitle(updatedQuestion.getQuestionTitle());
        qus.setOption1(updatedQuestion.getOption1());
        qus.setOption2(updatedQuestion.getOption2());
        qus.setOption3(updatedQuestion.getOption3());
        qus.setOption4(updatedQuestion.getOption4());
        qus.setDifficultyLevel(updatedQuestion.getDifficultyLevel());
        qus.setCategory(updatedQuestion.getCategory());
        return questionRepository.save(qus);


    }

    public void deleteQuestion(int questionId) {
        Question qus = questionRepository.findById(questionId).orElseThrow(()->new QuestionNotFoundException("Question not found with id "  + questionId));
        this.questionRepository.delete(qus);
    }
}
