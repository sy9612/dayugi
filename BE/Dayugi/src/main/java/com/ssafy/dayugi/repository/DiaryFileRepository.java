package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.DiaryFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DiaryFileRepository extends JpaRepository<DiaryFile, Long> {
    public Optional<DiaryFile> findDiaryFileByFid(int fid);//파일 id로 파일 조회
    public List<DiaryFile> findDiaryFilesByDiary_Did(int did);//일기 did에 해당하는 다이어리 파일 찾기
//    public DiaryFile findByFid(int fid);
    public int deleteDiaryFilesByDiary_Did(int did);//다이어리 id로 파일 전부 삭제
    public int deleteDiaryFileByFid(int fid);//파일 id로 해당 파일만 삭제
    public int deleteDiaryFilesByUser_Uid(int uid);//사용자의 파일 전부 삭제
}

