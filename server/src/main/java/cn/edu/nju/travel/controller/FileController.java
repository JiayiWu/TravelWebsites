package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.FileService;
import cn.edu.nju.travel.utils.ServerException;
import io.swagger.annotations.ApiOperation;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import javax.xml.ws.Response;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Value("${file.savePath}")
    private String savePath;

    @Autowired
    private FileService fileService;

    @ApiOperation(value = "上传文件", response = SimpleResponse.class,notes = "返回上传文件后文件指定的路径")
    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public SimpleResponse handleFileUpload(HttpSession session, @RequestParam("file") MultipartFile file) {
        if(session.getAttribute("userId") == null){
            return SimpleResponse.error("请先登录");
        }

        try{
            return SimpleResponse.ok(fileService.handleFileUpload(file, savePath));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

    }


}
