package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum ActivityTypeCode {
    COMMON(0,"通用接口"),CREATE(1,"自己创建的"),ATTEND(2,"自己参与的");
    private final String value;
    private final int index;

    ActivityTypeCode(int index, String value){
        this.index = index;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public int getIndex() {
        return index;
    }
}
