Attribute VB_Name = "Module1"
Sub �����}�N��()
Attribute �����}�N��.VB_ProcData.VB_Invoke_Func = " \n14"
'
' �����}�N�� Macro
'

Application.ScreenUpdating = False
'�ϐ��̊i�[
Dim jp_head As String
Dim en_head As String
Dim jp_temp As String
Dim en_temp As String
Dim attack As String
Dim jp_name As String
Dim en_name As String
Dim jp_position As String
Dim en_position As String
Dim jp_message As String
Dim en_message As String
Dim url As String
Dim head As Integer
Dim maxRow As Integer

Worksheets("�쐬�p�V�[�g").Select
jp_head = Range("F1").Value
en_head = Range("F2").Value
jp_temp = Range("F3").Value
en_temp = Range("F4").Value
attack = Range("F5").Value

jp_name = Range("J1").Value
en_name = Range("J2").Value
jp_position = Range("J3").Value
en_position = Range("J4").Value
jp_message = Range("J5").Value
en_message = Range("J6").Value
url = Range("J7").Value
head = Range("J8").Value


' ������V�[�g�̍쐬
    With Worksheets.Add()
        .Name = "HTML_���{��"
    End With
    With Worksheets.Add()
        .Name = "HTML_�p��"
    End With
' �w�b�_�[�̃R�s�[
Worksheets(jp_head).Select
Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_���{��").Range("A1")
Worksheets(en_head).Select
Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_�p��").Range("A1")

' �����̎擾
Worksheets(attack).Select
maxRow = Cells(Rows.Count, 1).End(xlUp).Row

Dim i
'�������J��Ԃ�
For i = head To maxRow
'�e���v���[�g�̃R�s�[/�u���i���{��j
    Worksheets(jp_temp).Select
    Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_���{��").Range("A" & Worksheets("HTML_���{��").Cells(Rows.Count, 1).End(xlUp).Row + 1)
    Worksheets("HTML_���{��").Select
    '���O
    Cells.Replace What:="$���O�i���{��j", Replacement:=Worksheets(attack).Range(jp_name & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    '����
    Cells.Replace What:="$�����i���{��j", Replacement:=Worksheets(attack).Range(jp_position & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    '���b�Z�[�W
    Range("A" & Range("A:A").Find("$���b�Z�[�W�i���{��j").Row).Value = Worksheets(attack).Range(jp_message & i)
    '�摜URL
    Cells.Replace What:="$URL", Replacement:=Worksheets(attack).Range(url & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False

'�e���v���[�g�̃R�s�[/�u���i�p��j
    Worksheets(en_temp).Select
    Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_�p��").Range("A" & Worksheets("HTML_�p��").Cells(Rows.Count, 1).End(xlUp).Row + 1)
    Worksheets("HTML_�p��").Select
    '���O
    Cells.Replace What:="$���O�i�p��j", Replacement:=Worksheets(attack).Range(en_name & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    '����
    Cells.Replace What:="$�����i�p��j", Replacement:=Worksheets(attack).Range(en_position & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    '���b�Z�[�W
    Range("A" & Range("A:A").Find("$���b�Z�[�W�i�p��j").Row).Value = Worksheets(attack).Range(en_message & i)
    '�摜URL
    Cells.Replace What:="$URL", Replacement:=Worksheets(attack).Range(url & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False


Next
    
'SQL�̍쐬
Dim sql As String

Worksheets("�쐬�p�V�[�g").Select
sql = "INSERT INTO " & Range("J12").Value & "posts(`post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES" & _
    "(1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'[:ja]"

Worksheets("HTML_���{��").Select
maxRow = Cells(Rows.Count, 1).End(xlUp).Row

For i = 1 To maxRow
    sql = sql & Replace(Replace(Range("A" & i).Value, vbLf, "\r\n"), "'", "''") & "\r\n"
    
Next

'�p��
sql = sql & "[:en]"
Worksheets("HTML_�p��").Select
maxRow = Cells(Rows.Count, 1).End(xlUp).Row

For i = 1 To maxRow
    sql = sql & Replace(Replace(Range("A" & i).Value, vbLf, "\r\n"), "'", "''") & "\r\n"
    
Next

Worksheets("�쐬�p�V�[�g").Select
'�^�C�g��
sql = sql & "','[:ja]" & Range("J13").Value & "[:en]" & Range("J14").Value & "',"

'���̑��͌Œ�l�œ����
sql = sql & "'', 'publish', 'closed', 'closed', '', 'message', '', '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', 0, '', 0, 'page', '', 0)"

'�o��
Range("B18").Value = sql

Application.ScreenUpdating = True
End Sub
