def isValid(s):
    stack = []

    for ch in s:
        if ch in "({[":
            stack.append(ch)
        elif ch == ")" and (not stack or stack.pop() != "("):
            return False
        elif ch == "]" and (not stack or stack.pop() != "["):
            return False
        elif ch == "}" and (not stack or stack.pop() != "{"):
            return False

    return not stack
