package cn.edu.nju.travel.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class StudentAuthInfo {

    @ApiModelProperty(notes = "申请人学生证")
    private String attachmentUrl;
    @ApiModelProperty(notes = "申请人留言")
    private String context;
}
