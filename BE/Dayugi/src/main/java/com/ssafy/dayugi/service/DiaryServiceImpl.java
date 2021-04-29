package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.repository.DiaryFileRepository;
import com.ssafy.dayugi.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class DiaryServiceImpl implements DiaryService{

    @Autowired
    private DiaryRepository diaryRepository;
    private DiaryFileRepository diaryFileRepository;
    @Override
    public int writeDiary(Diary diary) throws Exception {
        //한줄평 전처리는 어떻게 되는거지??
        //diary.setReview_content();
        diaryRepository.save(diary);//다이어리 저장
        //사진 올릴 경우도 생각해야함
        diaryFileRepository.save();
        return 1;
    }

    @Override
    public boolean updateDiary(Diary diary) throws Exception {
        Optional<Diary> curDiary = diaryRepository.findDiaryByDid(diary.getDid());
        if(curDiary.isPresent()){
            curDiary.get().setDiary_date(diary.getDiary_date());
            curDiary.get().setDiary_content(diary.getDiary_content());
            diaryRepository.save(curDiary.get());
            return true;
        }
        return false;
    }

    //완료
    @Override
    public Optional<Diary> readDiary(int did) throws Exception {
        Optional<Diary> diary = diaryRepository.findDiaryByDid(did);
        return diary;
    }

    @Override
    public List<Optional<Diary>> monthDiary(int uid, int year, int month) throws Exception {
        List<Optional<Diary>> diaries = diaryRepository.findByUserAndDate(uid, year, month);
        return diaries;
    }

    //완료
    @Override
    public boolean deleteDiary(int did) throws Exception {
        Optional<Diary> diary = diaryRepository.findDiaryByDid(did);

        if(diary.isPresent()){
            diaryRepository.deleteDiaryByDid(did);
            return true;
        }
        return false;
    }

    //완료
    @Override
    public boolean deleteAllDiary(int uid) throws Exception {
        List<Optional<Diary>> diaries = diaryRepository.findDiariesByUser_Uid(uid);
        if(!diaries.isEmpty()){
            System.out.println(diaries);
            diaryRepository.deleteDiariesByUser_Uid(uid);
            return true;
        }
        return false;
    }
}
