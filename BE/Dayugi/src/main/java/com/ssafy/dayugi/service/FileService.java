package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.DiaryFile;

import java.util.List;

public interface FileService {
    public int saveFiles(List<DiaryFile> files);
    public int saveFile(DiaryFile file);
    public DiaryFile getFile(Long fid);
}
