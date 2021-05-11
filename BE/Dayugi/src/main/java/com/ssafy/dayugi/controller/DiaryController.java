package com.ssafy.dayugi.controller;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.model.entity.DiaryFile;
import com.ssafy.dayugi.service.DiaryService;
import com.ssafy.dayugi.service.FileService;
import com.ssafy.dayugi.util.MD5Generator;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

@RestController
@RequestMapping("/diary")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;
    @Autowired
    private FileService fileService;

    @PostMapping(value = "")
    @ApiOperation(value = "다이어리 작성", notes = "다이어리 작성, 한줄평 저장")
    private ResponseEntity writeDiary(@ModelAttribute Diary diary, @RequestParam(required = false) List<MultipartFile> files) {
//    private ResponseEntity writeDiary(@RequestBody DiaryVo diaryVo) {
//        Diary diary = diaryVo.getDiary();
//        MultipartFile filess = diaryVo.getMultipartFile();
        diary.getDiary_date();
        Map result = new HashMap();
//        System.out.println("######################");
//        System.out.println(diary);
        System.out.println("######################");
        System.out.println(files);


        ResponseEntity entity = null;
        try {
            if (diaryService.writeDiary(diary) == 1) {
                result.put("success", "success");
                result.put("diary", diary);
            } else {
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        try{
            List<DiaryFile> diaryFiles = new ArrayList<>();
            if (files != null) {
//                System.out.println("$$$$$$$$$$$$$$$$$$$$$$");
//                System.out.println(diary.getUser().getUid());
                //System.out.println( diary.getDiary_date());

//                String textDate = diary.getDiary_date().toString();
//                Date strDate = null;
//
//                SimpleDateFormat recvSimpleFormat = new SimpleDateFormat("E MMM dd HH:mm:ss z yyyy", Locale.ENGLISH);
//                // 여기에 원하는 포맷을 넣어주면 된다
//                SimpleDateFormat tranSimpleFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
//
//                try {
//                    Date data = recvSimpleFormat.parse(textDate);
//                    System.out.println(data);
//                    strDate = tranSimpleFormat.parse(data.toString());
//                    System.out.println(strDate);
//                } catch (ParseException e) {
//                    e.printStackTrace();
//                }
                //int did = 0;
                //int did = diaryService.findDiaryId(diary.getUser().getUid(), data);

                for (MultipartFile file : files) {
                    String origFilename = file.getOriginalFilename();
                    System.out.println("########## origFilename ############");
                    System.out.println(origFilename);
                    String filename = new MD5Generator(origFilename).toString();
                    System.out.println("########## filename ############");
                    System.out.println(filename);
                    // 실행되는 위치의 'files' 폴더에 파일이 저장됩니다.
                    String savePath = System.getProperty("user.dir") + "\\files";
                    System.out.println("########## savePath ############");
                    System.out.println(savePath);
                    // 파일이 저장되는 폴더가 없으면 폴더를 생성합니다.
                    if (!new File(savePath).exists()) {
                        try {
                            new File(savePath).mkdir();
                        } catch (Exception e) {
                            e.getStackTrace();
                        }
                    }
                    String filePath = savePath + "\\" + filename;
                    file.transferTo(new File(filePath));

                    DiaryFile diaryFile = new DiaryFile();
                    diaryFile.setFile_origname(origFilename);
                    diaryFile.setFile_name(filename);
                    diaryFile.setFile_path(filePath);
//                    System.out.println("########## did ############");
//                    System.out.println(diary.getDid());
//                    int did = diary.getDid();
//                    Diary tempDiary = new Diary();
//                    tempDiary.setDid(did);
                    diaryFile.setDiary(diary);
                    diaryFile.setUser(diary.getUser());
//                    System.out.println("########## diaryFile ############");
//                    System.out.println(diaryFile);
                    diaryFiles.add(diaryFile);
                }
            }

            System.out.println("########## diaryFiles ############");
            System.out.println(diaryFiles);

            try {
                if (fileService.saveFiles(diaryFiles) == 1) {
                    result.put("success", "success");
                    result.put("diary", diary);
                } else {
                    result.put("success", "fail");
                }
                entity = new ResponseEntity<>(result, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                result.put("success", "error");
                entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }

        }catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @PutMapping(value = "")
    @ApiOperation(value = "다이어리 수정", notes = "다이어리 수정")
    private ResponseEntity updateDiary(@RequestBody Diary diary, @RequestParam(required = false) List<MultipartFile> files) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkSuccess = diaryService.updateDiary(diary);
            if (checkSuccess) {
                result.put("success", "success");
                result.put("diary", diary);
            } else {
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        //파일 수정
        try{
            List<DiaryFile> diaryFiles = new ArrayList<>();
            if (files != null) {
                for (MultipartFile file : files) {
                    String origFilename = file.getOriginalFilename();
                    String filename = new MD5Generator(origFilename).toString();
                    // 실행되는 위치의 'files' 폴더에 파일이 저장됩니다.
                    String savePath = System.getProperty("user.dir") + "\\files";
                    // 파일이 저장되는 폴더가 없으면 폴더를 생성합니다.
                    if (!new File(savePath).exists()) {
                        try {
                            new File(savePath).mkdir();
                        } catch (Exception e) {
                            e.getStackTrace();
                        }
                    }
                    String filePath = savePath + "\\" + filename;
                    file.transferTo(new File(filePath));

                    DiaryFile diaryFile = new DiaryFile();
                    diaryFile.setFile_origname(origFilename);
                    diaryFile.setFile_name(filename);
                    diaryFile.setFile_path(filePath);
                    diaryFile.setDiary(diary);
                    diaryFile.setUser(diary.getUser());
                    diaryFiles.add(diaryFile);
                }
            }
            try {
                boolean checkFileSuccess = fileService.updateFiles(diary.getDid(), diaryFiles);
                if (checkFileSuccess) {
                    result.put("success", "success");
                    result.put("diary", files);
                } else {
                    result.put("success", "fail");
                }
                entity = new ResponseEntity<>(result, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                result.put("success", "error");
                entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }

        }catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @DeleteMapping(value = "")
    @ApiOperation(value = "다이어리 삭제", notes = "did를 받아 선택한 다이어리 삭제")
    private ResponseEntity deleteDiary(int did) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkFileSuccess = fileService.deleteAllFile(did);
            if (checkFileSuccess) {
                result.put("success", "success");
            } else {
                result.put("success", "fail");
                result.put("message", "fail to delete files of diary");
            }
            boolean checkSuccess = diaryService.deleteDiary(did);
            if (checkSuccess) {
                result.put("success", "success");
            } else {
                result.put("success", "fail");
                result.put("message", "fail to delete diary");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @DeleteMapping(value = "/all")
    @ApiOperation(value = "다이어리 전체 삭제", notes = "사용자가 작성한 다이어리 전체 삭제")
    private ResponseEntity deleteAllDiary(int uid) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkFileSuccess = fileService.deleteUserFile(uid);
            if (checkFileSuccess) {
                result.put("success", "success");
            } else {
                result.put("success", "fail");
                result.put("message", "fail to delete files");
            }
            boolean checkSuccess = diaryService.deleteAllDiary(uid);
            if (checkSuccess) {
                result.put("success", "success");
            } else {
                result.put("success", "fail");
                result.put("message", "fail to delete all diary");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "")
    @ApiOperation(value = "다이어리 상세 조회", notes = "did를 받아 다이어리 1개 상세 조회")
    private ResponseEntity readDiary(int did) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            Optional<Diary> diary = diaryService.readDiary(did);
            if (diary.isPresent()) {
                result.put("success", "success");
                result.put("diary", diary);
            } else {
                result.put("success", "fail");
                result.put("message", "No Data");
            }
            List<DiaryFile> diaryFiles = fileService.getFiles(did);
            if (!diaryFiles.isEmpty()) {
                result.put("success", "success");
                result.put("diaryFiles", diaryFiles);
            } else {
                result.put("success", "fail");
                result.put("message", "No Data");
            }

            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "/monthly")
    @ApiOperation(value = "다이어리 월별 조회", notes = "사용자가 특정 연도,달에 작성한 다이어리 모두 조회")
    private ResponseEntity monthDiary(@RequestParam int uid, int year, int month) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            List<Optional<Diary>> diaries = diaryService.monthDiary(uid, year, month);
            if (!diaries.isEmpty()) {
                result.put("success", "success");
                result.put("diaries", diaries);
            } else {
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "/all")
    @ApiOperation(value = "다이어리 전체 조회", notes = "사용자가 작성한 다이어리 전체 조회")
    private ResponseEntity monthDiary(@RequestParam int uid) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            List<Optional<Diary>> diaries = diaryService.AllDiary(uid);
            if (!diaries.isEmpty()) {
                result.put("success", "success");
                result.put("diaries", diaries);
            } else {
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "/diaryfile")
    @ApiOperation(value = "다이어리 파일 조회", notes = "다이어리 파일 조회")
    private ResponseEntity fileDiary(@RequestParam int uid) {
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            List<DiaryFile> files = fileService.getUserFiles(uid);
            if (!files.isEmpty()) {
                result.put("success", "success");
                result.put("diaries", files);
            } else {
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

}
