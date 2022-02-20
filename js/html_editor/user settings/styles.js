/*creating styles for classes and subclasses in table*/

function create_class (class_name, ...style_content) {
	let style = document.createElement('style')
	style.setAttribute('type', 'text/css')
	style.setAttribute('id', 'style_'+class_name)
	if (style_content.length > 0) {
		if (style_content[0][0] == '{') style.innerHTML = `.${class_name} ${style_content[0]}`
		else style.innerHTML = `.${class_name} { ${style_content.join('; ')}; }`
	}
	else style.innerHTML = `.${class_name} { }`
	document.getElementsByTagName('head')[0].appendChild(style)
}

function generate_css_classes () {
	let style_content = []
	for (attrib in base_styles[MODE]) style_content.push(attrib + ': ' + base_styles[MODE][attrib])
	create_class('base', ...style_content)

	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			create_class(used_class_names[class_text][subclass_text])
		}
	}

	for (cl_name in base_text_styles) {
		for (scl_name in base_text_styles[cl_name]) {
			for (attrib in base_text_styles[cl_name][scl_name]) {
				set_css_attribute(attrib, base_text_styles[cl_name][scl_name][attrib], cl_name+'-'+scl_name)
			}
		}
	}

	load_settings()
}

const base_styles = {'light':{
							  'background-color':'transparent',
							  'color'           :'#000000',
							  'border'          :'0px solid #000000',
							  'font-style'      :'normal',   // normal | italic
					  		  'font-weight'     :'normal',   // normal | bold
							  'text-decoration' :'none'},    // none | line-through | underline
					 'dark': {
							  'background-color':'transparent', // 333366 ?
							  'color'           :'#ffffff',
							  'border'          :'0px solid #000000',
							  'font-style'      :'normal',   // normal | italic
							  'font-weight'     :'normal',   // normal | bold
							  'text-decoration' :'none'}     // none | line-through | underline
							  //'border-color'    :'#000000',
							  //'border-width'    :'0px',
					}

let base_style_classes = {}
for (base_style in base_styles) {
	base_style_classes[base_style] = document.createElement('style')

	let style_content = []
	for (attrib in base_styles[base_style]) style_content.push(attrib+': '+base_styles[base_style][attrib])

	base_style_classes[base_style].innerText = `.base_style_class_${base_style} { ${style_content.join('; ')};}`
	base_style_classes[base_style].setAttribute('id', 'base_style_class_'+base_style)
}

const base_text_styles = {'lesson_type': {
					'test'      : {'background-color': '#FFCCFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'test_2'    : {'background-color': '#FFCCFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'cons'      : {'background-color': '#FFCC99', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'exam'      : {'background-color': '#FFCCCC', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'practice'  : {'background-color': '#CCCCFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'lab'       : {'background-color': '#CCFFFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'lecture'   : {'background-color': '#CCFFCC', 'border':'0px solid #CCCCCC', 'color': '#000000'},
					'volkswagen': {'background-color': '#99CC99', 'border':'0px solid #CCCCCC', 'color': '#000000'},
}}

function check_is_base (style_tag, mode = null) {
	if (!mode) mode = MODE
	for (attrib in base_styles[mode]) {
		if (get_css_attribute(attrib, base_style_classes[mode]) != (get_css_attribute(attrib, style_tag))) return false
	}
	return true
}

function update_base_styles (style = MODE) {
	let style_tag = document.getElementById('style_base')

	set_css_attribute('background-color', base_styles[style]['background-color'     ], style_tag)
	set_css_attribute('color'	    , base_styles[style]['color'		], style_tag)
	set_css_attribute('border'	    , base_styles[style]['border'		], style_tag)
	set_css_attribute('font-style'	    , base_styles[style]['font-style'		], style_tag)
	set_css_attribute('font-weight'	    , base_styles[style]['font-weight'		], style_tag)
	set_css_attribute('text-decoration' , base_styles[style]['text-decoration'	], style_tag)
}

function generate_new_global_placement () {
	let list = document.getElementsByClassName('editbar-main-choice__item')
	let names = []
	for (let i = 0; i < list.length; i++) names.push(list[i].getAttribute('name'))
	let new_global_placement = []
	let i = 0
	for (cname of names) for (class_name in all_REs) {
		if (cname == all_REs[class_name][0]) {
		new_global_placement.push(class_name)
		break
		}
	}
	//console.log(new_global_placement)
	let need_reload = false
	for (let i = 0; i < new_global_placement.length; i++) {
		if (new_global_placement[i] != global_placement[i]) {
			need_reload = true
			break
		}
	}
	if (need_reload) {
		createCookie('global_placement', JSON.stringify(new_global_placement), 180)
		location.reload()
	}
}

/*
Format of storing in cookies 
'class-subclass'='text colour|bg colour|border colour|font styles and border'

JSON.stringify(a) - smth to str (with brackets and other)
eval(a) - from str to smth
*/

function compact_colour (hex_colour) {
	if (hex_colour[0] == '#') hex_colour = hex_colour.slice(1)
	hex_colour = hex_colour.toLowerCase()
	hex_colour = (Math.round(convert_sys_to_10(hex_colour.slice(0,2),16)/51)*36 +
				  Math.round(convert_sys_to_10(hex_colour.slice(2,4),16)/51)*6  +
				  Math.round(convert_sys_to_10(hex_colour.slice(4,6),16)/51)*1  + 1)
	return convert_10_to_sys(hex_colour, 256)
}

function encode_subclass_name (subclass_name) {
	let t = subclass_name
	const ch   = 'абвгдежзийклмнопрстуфхцчшщъыэюя_'
	const ench = 'abcdefghijklmnopqrstuvwxyz'
	const vowels = 'аоуыиеэюя'
 
	t = t.toLowerCase().replaceAll('ё','е').replaceAll('ь','ъ').replaceAll('.','')
	let matched = t.match(/\d/g)
	if (matched) for (let i = 0; i < matched.length; i++) t = t.replace(matched[i], ch[matched[i]])
	matched = t.match(/[a-z]/g)
	if (matched) for (let i = 0; i < matched.length; i++) {
		t = t.replace(matched[i], ch[ench.indexOf(matched[i])])
	}

	let cnt_of_vowels = -2
    for (let letter = 0; letter < t.length; letter++) {
        if (vowels.indexOf(t[letter]) !== -1) cnt_of_vowels += 1
	}
    if      (cnt_of_vowels > 7) cnt_of_vowels = 7
    else if (cnt_of_vowels < 0) cnt_of_vowels = 0
 
    let chars = [t[t.length-2], t[t.length-1]]
    t = t.split('_')[0]
    chars.push(t[0])
    chars.push(t[Math.floor(t.length/4)  ])
    chars.push(t[Math.floor(t.length/2)-1])
    chars.push(t[Math.floor(t.length/2)  ])
    chars.push(t[Math.floor(t.length/2)+1])
    chars.push(t[t.length-1])
 
    s1 = s2 = 0
    for (i in chars) if (chars[i]) {
		s1 += ch.indexOf(chars[i])*Math.pow(2, i)+1
		s2 += ch.indexOf(chars[i])+1
	}
 
	t = (bin(s1).padEnd(13,'0') + bin(s2).padEnd(8,'0') + bin(cnt_of_vowels).padEnd(3,'0'))
    return convert_from_to(t, 2, 256)
}

function encode_style (style_tag) {
	let value = result = ''
	value = get_css_attribute('background-color', style_tag)
	if (value == 'transparent') result += convert_10_to_sys(255)
	else result += compact_colour(value)
	value = get_css_attribute('color'           , style_tag)
	if (value == base_styles[MODE]['color']) result += convert_10_to_sys(255)
	else result += compact_colour(value)
	result += compact_colour(get_css_attribute('border', style_tag).split(' ')[2])

	value = ''
	value += get_css_attribute('font-style' , style_tag) == 'italic'? '1' : '0'
	value += get_css_attribute('font-weight', style_tag) == 'bold'? '1' : '0'
	switch(get_css_attribute('text-decoration', style_tag)) {
		case '':
		case 'none':
			value += '00'
			break

		case 'line-through':
			value += '01'
			break

		case 'underline':
			value += '10'
			break

		case 'line-through underline':
		case 'underline line-through':
			value += '11'
			break
	}
	value += (get_css_attribute('border', style_tag).split(' ')[0] == '1px'? '1' : '0')
	result += convert_from_to(value, 2, 256) 

	return result
}

function save_settings () {
	for (class_text in used_class_names) {
		if (Object.keys(used_class_names[class_text]).length == 0) continue
		let class_name = used_class_names[class_text][Object.keys(used_class_names[class_text])[0]].split('-')[0]
		let encoded_str = []
		let to_remove = []

		for (subclass_text in used_class_names[class_text]) {
			let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
			let style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)

			if (!check_is_base(style_tag)) {
				encoded_str.push(encode_subclass_name(subclass_name) + encode_style(style_tag))
			}
			else to_remove.push(encode_subclass_name(subclass_name))
		}
		
		let loaded_cookie = readCookie(class_name)
		let result_cookie = [...encoded_str]

		if (loaded_cookie) {
			loaded_cookie = loaded_cookie.split('|')
			for (code of loaded_cookie) {
				if (code.length != 7) code = try_debug(code)
				if (to_remove.indexOf(code.slice(0, 3)) !== -1) continue
				else {
					let push_old = true
					for (str of encoded_str) if (str.slice(0, 3) == code.slice(0, 3)) {
						push_old = false
						break
					}
					if (push_old) result_cookie.push(code)
				}
			}
		}

		createCookie(class_name, result_cookie.join('|'), 180)
	}
  
	generate_new_global_placement()
	if (current_filter_list) genFilterList(current_filter_list)
}

const special_colour_code = {255: 'dont_use', 254: 'transparent', 253: 'inherit'}
function unpack_colour (symbol) {
	symbol = convert_sys_to_10(symbol)
	if (symbol > 216) return special_colour_code[symbol]
	symbol--
	symbol = ('#' + convert_10_to_sys((Math.floor(symbol/36)%6)*51, 16).padEnd(2, '0') + 
			        convert_10_to_sys((Math.floor(symbol/6 )%6)*51, 16).padEnd(2, '0') + 
			        convert_10_to_sys((Math.floor(symbol/1 )%6)*51, 16).padEnd(2, '0'))
	return symbol
}

function decode_style (str) {
	let style_content = []
	let value = ''

	value = unpack_colour(str[0])
	if (value != 'dont_use') style_content.push('background-color: '+unpack_colour(str[0]))
	value = unpack_colour(str[1])
	if (value != 'dont_use') style_content.push('color: '           +unpack_colour(str[1]))

	value = convert_10_to_sys(convert_sys_to_10(str[3]), 2).padStart(5, '0')

	if (value[4] == '1') style_content.push(`border: 1px solid ${unpack_colour(str[2])}`)

	if (value[0] == '1') style_content.push('font-style: italic')
	if (value[1] == '1') style_content.push('font-weight: bold')
	style_content.push('text-decoration: ' + (value[2] == '1'? 'underline '  : ''      )
					       + (value[3] == '1'? 'line-through': ''      ))

	if (style_content[style_content.length-1] == 'text-decoration: ') {
		style_content.pop()
	}

	//console.log(`{ ${style_content.join('; ')}; }`)
	return `{ ${style_content.join('; ')}; }`
}

function try_debug (code) {
	if (code.length == 3) return code + encode_style(base_style_classes[MODE])
	else if (code.length == 6) return code + '0'
	else return '___0000'
}

function load_settings () {
	let head = document.getElementsByTagName('head')[0]

	for (class_text in used_class_names) {
		if (Object.keys(used_class_names[class_text]).length == 0) continue
		let class_name = used_class_names[class_text][Object.keys(used_class_names[class_text])[0]].split('-')[0]
		let loaded_cookie = readCookie(class_name)
		if (loaded_cookie) {
			let encoded_subclass_names = {}
			
			for (subclass_text in used_class_names[class_text]) {
				let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
				encoded_subclass_names[encode_subclass_name(subclass_name)] = subclass_name
			}

			let decoded_styles = {}
			for (code of Object.values(loaded_cookie.split('|'))) {
				if (code.length != 7) code = try_debug(code)
				for (key in encoded_subclass_names) if (code.slice(0, 3) == key) {
					decoded_styles[encoded_subclass_names[key]] = decode_style(code.slice(3, 7))
					break
				}
			}

			for (subclass_text in used_class_names[class_text]) {
				let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
				if (decoded_styles[subclass_name]) {
					old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
					if (old_style_tag) head.removeChild(old_style_tag)
					create_class(class_name+'-'+subclass_name, decoded_styles[subclass_name])
				}
				else {
					old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
					if (old_style_tag) old_style_tag.innerHTML  = `.${class_name+'-'+subclass_name} { }`
				}
			}
		}
		else {
			for (subclass_text in used_class_names[class_text]) {
				let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
				old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
				if (old_style_tag) old_style_tag.innerHTML  = `.${class_name+'-'+subclass_name} { }`
			}
		}
	}
 
	used_class_names = create_used_class_names()
 
	genEditOrder()
	if (current_filter_list) genFilterList(current_filter_list)
}


function set_default_styles () {
	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			let class_name = used_class_names[class_text][subclass_text]
			style_tag = document.getElementById('style_'+class_name)
			if (style_tag) style_tag.innerHTML  = `.${class_name} { }`
		}
	}

	for (cl_name in base_text_styles) {
		for (scl_name in base_text_styles[cl_name]) {
			for (attrib in base_text_styles[cl_name][scl_name]) {
				set_css_attribute(attrib, base_text_styles[cl_name][scl_name][attrib], cl_name+'-'+scl_name)
			}
		}
	}

	used_class_names = create_used_class_names(base_global_placement)

	genEditOrder()
	if (current_filter_list) genFilterList(current_filter_list)
}

function set_clear_styles () {
	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			let class_name = used_class_names[class_text][subclass_text]
			style_tag = document.getElementById('style_'+class_name)
			if (style_tag) style_tag.innerHTML  = `.${class_name} { }`
		}
	}
	
	genEditOrder()
	if (current_filter_list) genFilterList(current_filter_list)
}
