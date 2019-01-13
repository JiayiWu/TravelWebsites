package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum  RelationStateCode {


    VALID(0,"有效"),INVALID(1,"失效"),DELETE(2,"逻辑删除");
    private final String value;
    private final int index;

    RelationStateCode(int index, String value){
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
