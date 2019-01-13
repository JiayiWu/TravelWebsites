package cn.edu.nju.travel.form;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class AttendActivityForm {
    @ApiModelProperty(notes = "申请加入的活动ID")
    private int activityId;
    @ApiModelProperty(notes = "申请人ID")
    private int userId;
    @ApiModelProperty(notes = "申请人附件")
    private String attachmentUrl;
    @ApiModelProperty(notes = "申请人留言")
    private String context;
}
