package com.ssafy.dayugi.controller;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.service.DiaryService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/diary")
public class DiaryController {
    
    @Autowired
    private DiaryService diaryService;
    
    @PostMapping(value = "")
    @ApiOperation(value="다이어리 작성", notes="다이어리 작성, 한줄평 저장")
    private ResponseEntity writeDiary(@RequestBody Diary diary){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
           if(diaryService.writeDiary(diary) == 1){
               result.put("success", "success");
               result.put("diary", diary);
           }else{
               result.put("success", "fail");
           }
           entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @PutMapping(value = "")
    @ApiOperation(value="다이어리 수정", notes="다이어리 수정")
    private ResponseEntity updateDiary(@RequestBody Diary diary){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkSuccess  = diaryService.updateDiary(diary);
            if(checkSuccess){
                result.put("success", "success");
                result.put("diary", diary);
            }else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @DeleteMapping(value = "")
    @ApiOperation(value="다이어리 삭제", notes="did를 받아 선택한 다이어리 삭제")
    private ResponseEntity deleteDiary(int did){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkSuccess  = diaryService.deleteDiary(did);
            if(checkSuccess){
                result.put("success", "success");
            }else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }
    @DeleteMapping(value = "/all")
    @ApiOperation(value="다이어리 전체 삭제", notes="사용자가 작성한 다이어리 전체 삭제")
    private ResponseEntity deleteAllDiary(int uid){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkSuccess  = diaryService.deleteAllDiary(uid);
            System.out.println(checkSuccess);
            if(checkSuccess){
                result.put("success", "success");
            }else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "")
    @ApiOperation(value="다이어리 상세 조회", notes="did를 받아 다이어리 1개 상세 조회")
    private ResponseEntity readDiary(int did){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            Optional<Diary> diary = diaryService.readDiary(did);
            if(diary.isPresent()){
                result.put("success", "success");
                result.put("diary", diary);
            }else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }
    @GetMapping(value = "/monthly")
    @ApiOperation(value="다이어리 월별 조회", notes="사용자가 특정 연도,달에 작성한 다이어리 모두 조회")
    private ResponseEntity monthDiary(@RequestParam int uid, int year, int month){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            List<Optional<Diary>>  diaries = diaryService.monthDiary(uid, year, month);
            if(!diaries.isEmpty()){
                result.put("success", "success");
                result.put("data", diaries);
            }else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

}
