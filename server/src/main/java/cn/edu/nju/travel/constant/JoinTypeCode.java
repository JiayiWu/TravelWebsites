package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum JoinTypeCode {


    DIRECT(0,"不需要审批"),AUTH(1,"需要审批");
    private final String value;
    private final int index;

    JoinTypeCode(int index, String value){
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
