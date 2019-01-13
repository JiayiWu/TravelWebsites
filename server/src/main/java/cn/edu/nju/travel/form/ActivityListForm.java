package cn.edu.nju.travel.form;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Timestamp;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class ActivityListForm {
    @ApiModelProperty(notes = "一次获取多少个活动")
    private int size;
    @ApiModelProperty(notes = "当前列表最后一次活动时间")
    private long lastTimestamp;
}
