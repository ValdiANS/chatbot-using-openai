const Message = ({
  type = 'answer' || 'question',
  msg = '',
  nolabel = false,
}) => {
  let containerJustify, messageClass;

  switch (type) {
    case 'answer':
      containerJustify = 'justify-start';
      messageClass =
        'relative left-[20px] bg-white rounded-xl rounded-tl-none p-4 w-fit max-w-[85%] drop-shadow-md before:absolute before:top-0 before:right-full before:border-[10px] before:border-white before:border-b-transparent before:border-l-transparent before:drop-shadow-sm before:-z-10';
      break;

    case 'question':
      containerJustify = 'justify-end';
      messageClass =
        'relative right-[20px] bg-white rounded-xl rounded-tr-none p-4 w-fit max-w-[85%] drop-shadow-md before:absolute before:top-0 before:left-full before:border-[10px] before:border-white before:border-b-transparent before:border-r-transparent before:drop-shadow-sm before:-z-10';
      break;
  }

  return (
    <div className={`w-full flex flex-row ${containerJustify}`}>
      <div className={messageClass}>
        {!nolabel && <h3 className="font-bold capitalize">{type} :</h3>}

        <pre className="font-ibm-plex-serif text-sm whitespace-pre-wrap">
          {msg}
        </pre>
      </div>
    </div>
  );
};

export default Message;
