package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum  ActivityStateCode {
    VALID(0,"新申请审批，还未处理"),INVALID(1,"审批通过"),DELETE(2,"审批拒绝"),DETELE(3,"逻辑删除"),END(4,"活动结束");
    private final String value;
    private final int index;

    ActivityStateCode(int index, String value){
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
