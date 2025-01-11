package com.micro.aqs.controller;

import com.micro.aqs.entities.Question;
import com.micro.aqs.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @GetMapping("/all-questions")
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestions();
    }
    @PostMapping("/add-question")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return new ResponseEntity<>(questionService.addQuestion(question), HttpStatus.CREATED);
    }
    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable int questionId){
        return new ResponseEntity<>(questionService.getQuestionBtId(questionId),HttpStatus.OK);
    }
    @PutMapping("/{questionId}")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question, @PathVariable int questionId){
        return new ResponseEntity<>(questionService.updateQuestion(question,questionId),HttpStatus.OK);
    }
    @DeleteMapping("/{questionId}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int questionId){
        this.questionService.deleteQuestion(questionId);
        return  new ResponseEntity<>("question delete successfully",HttpStatus.OK);
    }

}
