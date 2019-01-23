package cn.edu.nju.travel.form;

import cn.edu.nju.travel.constant.JoinTypeCode;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Timestamp;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class ActivityForm {
    @ApiModelProperty(notes = "创建操作时非必填")
    private Integer id;

    private Integer createId;

    private String title;

    private String location;
    /**
     * 活动开始时间，必填
     */
    @ApiModelProperty(notes = "活动开始时间，必填")
    private long startTime;

    /**
     * 活动结束时间,非必填
     */
    @ApiModelProperty(notes = "活动结束时间,非必填")
    private long endTime;


    /**
     * {@link JoinTypeCode}
     */
    @ApiModelProperty(notes = "0是不需要审批直接加入，1是需要审批")
    private Integer joinType;

    private String coverUrl;

    private String description;
}
