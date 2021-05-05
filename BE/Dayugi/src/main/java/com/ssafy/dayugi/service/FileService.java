package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.DiaryFile;
import com.ssafy.dayugi.repository.DiaryFileRepository;
import com.ssafy.dayugi.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface FileService {
    public Long saveFiles(List<DiaryFile> files);
    public Long saveFile(DiaryFile file);
    public DiaryFile getFile(int fid);
}
