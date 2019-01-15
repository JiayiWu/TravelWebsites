package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.utils.ServerException;
import io.swagger.annotations.ApiOperation;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import javax.xml.ws.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/file/")
public class FileController {

    @Value("${file.maxUploadSizeMB}")
    private int maxUploadSize;

    @Value("${file.savePath}")
    private String savePath;

    @ApiOperation(value = "上传文件", response = SimpleResponse.class,notes = "返回上传文件后文件指定的路径")
    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public SimpleResponse handleFileUpload(HttpSession session, @RequestParam("file") MultipartFile file) {
        if(session.getAttribute("userId") == null){
            return SimpleResponse.error("请先登录");
        }
        if(file.isEmpty()){
            return SimpleResponse.error("文件不能为空");
        }
        if(file.getSize() > maxUploadSize*1024*1024){
            return SimpleResponse.error("文件大小不能超过"+maxUploadSize+"M");
        }

        int index = file.getOriginalFilename().lastIndexOf(".");
        String suffix = file.getOriginalFilename().substring(index);
        try {
            File path = new File(ResourceUtils.getURL("classpath:").getPath());
            if(!path.exists()){
                path = new File("");
            }
            String contextPath = Paths.get(path.getAbsolutePath(),"static").toString();
            String randomName = getRandomFileName();
            String saveFileName = Paths.get(contextPath,savePath,randomName+suffix)
                    .toString();
            File saveFile = new File(saveFileName);
            while(saveFile.exists()){
                randomName = getRandomFileName();
                saveFileName = Paths.get(contextPath,savePath,randomName+suffix)
                        .toString();
                saveFile = new File(saveFileName);
            }
            File parentFile = saveFile.getParentFile();
            if(!parentFile.exists()){
                parentFile.mkdirs();
            }
            file.transferTo(saveFile);
            return SimpleResponse.ok(savePath+"/"+randomName+suffix);
        } catch (IOException e) {
            return SimpleResponse.exception(e);
        }

    }

    private String getRandomFileName(){
        SimpleDateFormat simpleDateFormat;
        simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String str = simpleDateFormat.format(date);
        Random random = new Random();
        int ranNum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数
        return ranNum + str;
    }
}
