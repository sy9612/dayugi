package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.repository.DiaryRepository;
import org.hibernate.annotations.NamedQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Query;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryServiceImpl implements DiaryService{

    @Autowired
    private DiaryRepository diaryRepository;
//    private PlantRepository plantRepository;

    @Override
    public boolean writeDiary(Diary diary) throws Exception {
        //한줄평 전처리는 어떻게 되는거지??
        //사진 올릴 경우도 생각해야함
        diaryRepository.save(diary);//다이어리 저장
//        Optional<Plant> plant = plantRepository.findPlantByUid(uid);
//        int experience = plant.get().getExpereience(); //식물 경험치
//        plant.get().setExpereince();
        //디비에 저장할 때 경험치 상승
        //경험치 다 차면 레벨 상승, 다육이 이벤트 추가
        return false;
    }

    @Override
    public boolean updateDiary(Diary diary) throws Exception {
//        Optional<Diary> prevDiary = diaryRepository.findDiaryByDid();
//        if(prevDiary.isPresent()){
//            prevDiary.get().setDiary_date(diary.getDiary_date());
//            prevDiary.get().setDiary_content(diary.getDiary_content());
//        }
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
        List<Optional<Diary>> diaries = diaryRepository.findDiariesByUid(uid);
        if(!diaries.isEmpty()){
            diaryRepository.deleteDiariesByUid(uid);
            return true;
        }
        return false;
    }
}
