PGDMP                  	    |           stayfit_database    17rc1    17rc1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    stayfit_database    DATABASE     �   CREATE DATABASE stayfit_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
     DROP DATABASE stayfit_database;
                     postgres    false            �            1259    16403    clients    TABLE     �  CREATE TABLE public.clients (
    id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    birth_date date,
    gender character varying(10),
    email character varying(100),
    phone character varying(15),
    weight numeric(5,2),
    height numeric(5,2),
    allergies text[],
    food_intolerances text[],
    activity_level character varying(50),
    fitness_goals text,
    workout_preferences text,
    available_time character varying(50),
    photo bytea,
    username character varying(50),
    password character varying(255),
    confirm_password character varying(255),
    professional_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.clients;
       public         heap r       postgres    false            �            1259    16402    clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.clients_id_seq;
       public               postgres    false    222            �           0    0    clients_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;
          public               postgres    false    221            �            1259    16434    foods    TABLE     �  CREATE TABLE public.foods (
    id integer NOT NULL,
    descrizione character varying(255),
    parte_edibile double precision,
    acqua double precision,
    energia_kcal double precision,
    energia_kj double precision,
    proteine_totali double precision,
    lipidi_totali double precision,
    lipidi_saturi double precision,
    colesterolo double precision,
    alcool double precision
);
    DROP TABLE public.foods;
       public         heap r       postgres    false            �            1259    16433    foods_id_seq    SEQUENCE     �   CREATE SEQUENCE public.foods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.foods_id_seq;
       public               postgres    false    224            �           0    0    foods_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.foods_id_seq OWNED BY public.foods.id;
          public               postgres    false    223            �            1259    16390    professionals    TABLE     [  CREATE TABLE public.professionals (
    id integer NOT NULL,
    profession_type character varying(50),
    certifications text[],
    tax_code character varying(20),
    first_name character varying(50),
    last_name character varying(50),
    birth_date date,
    email character varying(100),
    phone character varying(15),
    work_area character varying(100),
    experience integer,
    description text,
    profile_photo bytea,
    username character varying(50),
    password character varying(255),
    subscription_type character varying(50),
    social_network character varying(50),
    social_account_name character varying(100),
    terms_accepted boolean,
    privacy_policy_accepted boolean,
    referral character varying(100),
    receive_updates boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public.professionals;
       public         heap r       postgres    false            �            1259    16389    professionals_id_seq    SEQUENCE     �   CREATE SEQUENCE public.professionals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.professionals_id_seq;
       public               postgres    false    220            �           0    0    professionals_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.professionals_id_seq OWNED BY public.professionals.id;
          public               postgres    false    219            2           2604    16406 
   clients id    DEFAULT     h   ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);
 9   ALTER TABLE public.clients ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            4           2604    16437    foods id    DEFAULT     d   ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods_id_seq'::regclass);
 7   ALTER TABLE public.foods ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            0           2604    16393    professionals id    DEFAULT     t   ALTER TABLE ONLY public.professionals ALTER COLUMN id SET DEFAULT nextval('public.professionals_id_seq'::regclass);
 ?   ALTER TABLE public.professionals ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            �          0    16403    clients 
   TABLE DATA             COPY public.clients (id, first_name, last_name, birth_date, gender, email, phone, weight, height, allergies, food_intolerances, activity_level, fitness_goals, workout_preferences, available_time, photo, username, password, confirm_password, professional_id, created_at) FROM stdin;
    public               postgres    false    222   h)       �          0    16434    foods 
   TABLE DATA           �   COPY public.foods (id, descrizione, parte_edibile, acqua, energia_kcal, energia_kj, proteine_totali, lipidi_totali, lipidi_saturi, colesterolo, alcool) FROM stdin;
    public               postgres    false    224   +       �          0    16390    professionals 
   TABLE DATA           V  COPY public.professionals (id, profession_type, certifications, tax_code, first_name, last_name, birth_date, email, phone, work_area, experience, description, profile_photo, username, password, subscription_type, social_network, social_account_name, terms_accepted, privacy_policy_accepted, referral, receive_updates, created_at) FROM stdin;
    public               postgres    false    220   �k       �           0    0    clients_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.clients_id_seq', 15, true);
          public               postgres    false    221            �           0    0    foods_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.foods_id_seq', 1, false);
          public               postgres    false    223            �           0    0    professionals_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.professionals_id_seq', 2, true);
          public               postgres    false    219            <           2606    16412    clients clients_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_email_key;
       public                 postgres    false    222            >           2606    16410    clients clients_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public                 postgres    false    222            @           2606    16414    clients clients_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_username_key UNIQUE (username);
 F   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_username_key;
       public                 postgres    false    222            B           2606    16439    foods foods_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.foods DROP CONSTRAINT foods_pkey;
       public                 postgres    false    224            6           2606    16399 %   professionals professionals_email_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.professionals
    ADD CONSTRAINT professionals_email_key UNIQUE (email);
 O   ALTER TABLE ONLY public.professionals DROP CONSTRAINT professionals_email_key;
       public                 postgres    false    220            8           2606    16397     professionals professionals_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.professionals
    ADD CONSTRAINT professionals_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.professionals DROP CONSTRAINT professionals_pkey;
       public                 postgres    false    220            :           2606    16401 (   professionals professionals_username_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.professionals
    ADD CONSTRAINT professionals_username_key UNIQUE (username);
 R   ALTER TABLE ONLY public.professionals DROP CONSTRAINT professionals_username_key;
       public                 postgres    false    220            C           2606    24580 $   clients clients_professional_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.professionals(id);
 N   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_professional_id_fkey;
       public               postgres    false    4664    222    220            �   �  x��S�n�@=_���. �I��^�������&�R�i��,EmkR2�7�yo��a����Q�����S@���a^c��<`Y��t	\�A8��Az���}|~���U{�lr�"�Tɴ�[GH�!}&ܘw��T�B�˙˓���?|��,L�#`��zTXe;E�L�,p��S.,��Yy�{�D=݈�t;�Ǟr�����RV�^)���yQ�I�;H�C���N��{*���ꌬkU!-`K�j��'.�G-���$k���0���AM�,Sx~!��O�,;�U�-�m"�\��6�E�v���6`�
���vp����=�v�!,дX)xnT�ћ�[���o��٦O�rݎ=��+�F�v��o�@��O��e;�N����8ߣ�3      �      x��}ے�8���?ƪ�EK� @�̗욌�`D�Rct��ί_?� $EvՌUwuu%���m��~�}��v�n<��y��M��n3�Mh���m��۸q�fؤfӼ�'��\���2�M�l�V0���q�M�u�^����?�ül\#p5q�G/���qn���L�1A�	����Mظ�i�a��_/����F�s����z��ǻ�r��6��
�v�ھ�6��x��o�i��_�&ٔM��sW���珿���ؽ�������M�e'�u��:����O����5�'N���A&n�|y�ӟP�kv��eӷ���Y٧����^��N��a�ˣw��|�v��r�o����������F�� ��8
��$e1]�S�ߒ�������t��ߌ�m��^���e�ۦ7hX��y��?��%�~'�b#ِ ��[�~��t�r]��:	l�{m/{e��R�(���V~MU���,�y3������#'��p��x����_���fB��J��L}r�����IB�I_�z��_�_�M�X���~Y����n��y���I�:����(_~^*
�d5�5ˮ%��^���^�9��8��Ӵ�@�|d!�B�/rY1j����������r��aĉ�^�˕��~;��zw��M����!����V3�_��>�����]�M���h��S�&�d<�_�M�pAx��l�u���.���|~��LJ�O�1a�O.k�m��@��;A����>74(��dO�Y�s�6����q�DW���V��ۂ�A#/2G�!�#FϱB~ �JeO��n�y*�mV v�����ܼ,�5} �ǒ�#nC��rڟ�y��_r0��IX����Xd�d�SZ9�܏�ENx<����t��M`rqd㝬���8R���|Z W��r�y�e�;�]>��b��'����`yU�sbA ���q'lo+"��� 1s�e}=n9�l�LW�"��}�O8�Ko�kޮ�̖�l�P�r�e��!��6`�]FxE��h����rNbEJT�Fv�P��ǈ������a����X��Q�56v7��ߎ"�䃕t f$ہ�'s�M�=�.��OD,݉��!�zlP���!�gb�=��Q�_����l�d 9��,g�O��n�\��jq�D�G�ɰ�Er�Oތ��@`�N���:R��&+g�h??E&���\j�@�t��r�;�_BTA�y�eH+@N�"���,���M���	 �8�9��uڒOOЙ��	l��g/t#�/c�俦L8h�M"�{l��;��u9��e?
oL�t�gʍ"��y���8�y_�?D�ڝ܎�q�XӅT)���T��r/��e�<�žm�BP2j/���n7���"Q���NV�-�8U" %\��S%JQ�eYN>��
��?�d�N `����!�Lj�%z�zϲ�y��ߝ��e��E�Z����	u�
��¹첊��i���J;�#�/�h�k�������(�E���D����5��D�$��MV:	��P�6PMV�i�N�>h䇀�e}�JE�p��ʹ�pJt5D�zM���D5�F ;��iۂh�F9�Yn�N��hڟ��[�f�"�^�6u�e[�e��񱒸^�h_g9 a��XpKݓN���$Wݵ�g���"W��YHp>�D�
3��#dC ;Q�|���`j>]'�G�]� ���)����˯�W�H�����>�~ͦ>��</U([�3+��O9���u��϶�B)PI��V$��H{H�Ԭȳ���n�~mr9d��@y|��y�=T�n+��(�u���9Aӯ���F�CD6�&Jq�+����t��5w��7�� {��Kj3d��w���(�#�5/���9��R �N)�ނ1�Z�i���/()���E+��7�:E��R�x�1��ih�ux[̒�$[,_�a��H��O k�b���#ojj(y�)�)���i�GRF&\h�n������{(BB���[!ā��EH Q��L"g�T������d!�;3�# ���E�V�ma4C�i��y�=i���D�	�h�X�4�A��������I�J?�w+���!\ ��+����A�I�2��?�L0Ze��R�7ʟ�։��|�|C�����-m�N��b.P��G`�Id�NmG�/�r=�b�z���`��\�Q�5G��^��X;`�	d�k������ƞ�������	Se,���� 3�tj�ʢ[*�A^�E���y�O=L�&Eےc��Ba���Ͽ�2d�"bF/.�Z�A�d�4���5�  ��{}:��<�� 'X�����V��;#|�*j���Q���nqv���E��Y�����3��p(hg�WDC����RO35������9s����0Hį�om�xl�REo��pML����VDLj?�1�J��_�<7Q�$��ʿ�V�ۘm�~�ܾ&d�2�������&	�A}G]5�`���C�Ô���l�`�#���^���f����f;*W��~He޸FH��F��IEP�������p�+P��(D���v/�:��t!�LT�]n]"ThCDf�� v�0#d��Q\p**�-�@LQ@m��f*���	���!)�#bɞa����.�.ط`:$X��VDଲ�j����![�p���]L���e/�<������O�V��n=������8]��r���F��"_f� {�vu��%s�	�_c�r`��6%za��氄֘|5j�C��N'�^�X��ᐔv/�.C?�5\?��+���>��Np�fi�Y�bs�v��x�f'*�����2�/qO¸7/�����W�i�N������q�N~|�3���~o�`7������4��;���Vǃ���w�$z��
�������m]4x��o��6�����{��w��L(�7/"��F�v�Bb!W����ϧ��~	�eL����o��,���'���ߘ��W�f^Q�<���˸�m����-�/~���v�Au2*�!��2=Tj�=e���B�2xw��������x��{�7�+���t|+G/����nĠ~TY]�LH���Y �(�>���!Ydܩ��n��U��"�n��q�r�UT�ZP��N�-�X,��,eׂD>��R8*4� � �̈́�4/8�	Q|�;��*��T�טQZhA�ZЛ�"��8Pv�����g�J����4�����s'�3��kc����Ǫ�ԯ�O' �b��<��p�N������x��@T��Tz{����j�����˨7�PAE���4��9�v��M5���_�7�P��f�BN
>�4���i�	
=�.�N�"�g��8#�RG�H��r+f�9m�SXO8��&�vz"������}aT���DU���uCc-�� "9��4���B�#��y�N�����֎6H��l':���Dp�I�܅C}��'W��>Vg63�a�~(c�3G��"+�'Q��L����0�����*��QO��ff�wn��.��ha{�3��Mh���?�5�J�zw"44فV-�cC�	��E"�q#i�	o��k'H[&S-�]U'���� �1��HA�;�^�U��$5g�#�+_�;C���L~��F ��}����"��~����ڑ�:\c���^�Y==�t?e��`�]�a�MbS��q�P��v{b��`˰�:����N��a��=#���Ɂ�wa��BE!�i?M����7R�:vrPά�V!���> ���5)Z�~z;/f�-Yl:Q Ro�Ν�'����G�����c����;Aǽ\�p�hr��L�h�Ѕ�3#D���5��T���fKm#�G��n��I$S�����e$�"C{���r�Z�F²X�����������\x/L�Z	}B��"��M�I,W�����	���M�o��
�����3�:D�/ ��M���)BsZ��#S��+�{;��ܽ`�K������I&�!I�"���g^�x������g�&t��8�!0����    ��&X�2�|�׮r{A��厫��an9������̼cfk�fg��=�/��Ԋ�I&�&���eCw0,��IAM��*JxF����&� �q�!`y/�̀r/d#2����,�,�#�i��Y�����<}L��?�������}h,�C<F.�l瓧3��s��uO� �Dk�^xK�%y4��t҈RP��;-<��IUa���Q�ޑ�c�XO�{)�[^���� �۹��F~Ț�n������c-��.�AbD�:{2Z�@\�q_�<�V ���K��|z ��������ztO97�u��B�0:l�ć(��e����r�P&J�
G��'1���^Dt{o��-݃��曓�rVXN��09����ԧl*_"��[s�D[s=�g��=kQ�$*ٝ.%��u�b7A��N�Y��^�B��F�lq e:�2�e��m:T�C^CRcQW�m�+�]�0��i���庬�,t W@a�
T�Z�UKwQ�oN��U���X�x�/9��Ҧ �l�A���ؚ��^��>�s�9�lo���S�f0d+{<(![�{���G���ˋ�18�8R�=���R����b����J�'x�ѭ��}�K`ǭF���-i�ɐ �_��bH�YtZQ�{P�0�1���6*[%$s�?����}��m$��	����]	���c��W�}��Nj��}6�S�o���+򴨄.�QclQ@�8�-���Q��,�N�gO�@�F!��L'�$^������uM"�%��/*��i�R{�y<�X^_��7[��V��e�e� '\ ���y��^]�ˎr�����<g�lܞO�ǈR��rх��pAP����P���S���L�M	щ�(_���E5  ��g�9� WM~��4���0��t���F���Zp_��y��d�u�C���\4�jD��Q��d-3���3d3n��׆l� �QL1��8=o[�ODZo��7M?`��(|�o�c>,׀ �f(�W���CD���1q�)�Ga]k+���rbn�*d����'tw�-���^K��l��Na�fF�И�<�ʯ<�3P�@�@�����Ă����AʇOyx厤�@�z٥��������"%����vUxA� 44�ç�v��u�L�6C��9G󚭦I	K�S~��7�x��]��*0@���ݣ�e�%�|�{��G=�����&���X�K�����vP����i�23�u0���h�C̠n3���1��D�NWtKO#�р�iQ����*�ش�qWGe��ZJzՓe�Jx�Dw̵
�2#���}��r�)�����}��.pwƁb5h�*dU��4:q�0����"'�v�x���b����iL�r�	x�]�7�Ʒ��_�A�8�c5��H�T�\2�A��"Ru����|o���_tk]�o�%2��1d�i��)9n�w$������T4�O�^�����;��I�K��:h�ܿ�E�Z����!��������>�>������'�� �Y1���t��@�n��,P���ꁝy�E�b&'�7�8Km�[`�AѶR�nƹ7���{	��
��Pnl�N���۵E�vm�N������]�Z*3p��/��� Ȑ;|;�U.���X�ޯ^}��w��:A�o&�~��ä3�j�wD�
�������tv/��� E`2%AӺs��f��]y�}�?��%�aD��1=��'���k�Zο���5�:��S7[Q�&��|)(x� �ᲤB�ەQ5I]��Q��w�ܩ��c,���'�o�P���ApJ�RQ��,%����Ś�.�<nU�^赸N��r���lt+��������,<M�/�uNr��!5�HS���C
��AcYkV'O:f��ԇw��������V?V�8q�]x�i��{ꩵ��_��T� �U����PO�F �W�%�&�~x���+-�x�aNm���� 1[���"�ZZz�͎�����*�f:�
�|%�=O�5��$bAlʿ��MQ��aP(�A���݉����#{���J�T�r�� �ܽ�1�����!��`��F�h�i��X�'�[������ɼ=����:&��'OS]����T��"�I��W�,�Y> �k 3(3i��_J�a��S�3�3����|���eXm���B��`P�dd���D݋Jؗ�E��F���pX���T����J�lJ�P�o��ϻMG�1��������O�p�C���	��a�9]�QH�����W�y���LY�"nt`e);������ =�e9����i.�<��r�J���{��_7�4ʶ�ܜ� �jV}/���Q�k66S��xV'j����_y_࠳l��ge�W!�"�?��ռY³hLsd;lt���&� 7F4�U�Ê���<`�����#rg9s�*z2/FB7(��%�I�nEp3����Gg��r�XN�D��!BH�@zN��E�a��L���Ǉ48�b�S�y8����I���|ߦ���h�دp�-�����O侮;��U���`�dZZ�A�T�Jgr[K�ֿY�Bg?�+F�q�(_�RF^y�F����bv��������4WO�Sq����Z!Ex��n��U�k-���h{o��,ְ����P6�Џ:�)E9��͐��&r�gTo���Q%��6�s9�gd9�T/x�r��e�
��P3�S-i���E�@&.m�-"��bih,�b�J����S�����=4[-�s�/��c)�s��/���^��n���f�}�Kd�B�����4�����}��L��ҫ��l񜤍"L�B-��<$��s�Z��	n9����$��!��YX|��P?^Gd[#2�Z��֗X�8LO`0�"J�:�`_I+I�w:��nS�XD!b��y���BKH�=���W��:�w�����^�Й6в$W�\���b}Pt�|�C������,�"��ժ�n���1�� ��q�WY�呂c]?�v�����X�n���V�G0y3�j��F,"��F����e��e���D�Hu���
��~N��{�Ԓ�f�`��-J�n����K�����P���|�-V.j�z	 p"�����ʽ�X��J���?��;�,䩏@�aB0E֙���4�U�l���A���	y�����������t�)t^c����=�MN�c���w�L�DVp	�6t`η�[�f�<�3a.���,  &|�e���N�h;�|��`�$�/1�z���tL]�?ӻ-�nl�%�*�P��}8AvݡŃ�[ⅱ��RJ��*&�>��_O�����ae	���̇�P�FՄ��ЯT�
#��B��^r�dW`Q���H��*�̩ �g1�V����_�����F�'��Wr��!��ޮ��D����0�W�JѸ��[`�}��7a���x	�b>ii���i�ZJ�5�a�Θ��b����;.u�0S{&a�	��^�!�vY������ˤ�_�9$0Faf9c7�jp3~�?E!��ҳ(ͧ�Z��5?�Rq��3Vb�����_o�Z�� ���ϨeD�H���3�����!g'wb�~(Ů"��I������,�G¨xH2�����;yA�aiC�$����[<����(�B��$itn�Io�Z1'A�yVe'�mU@U�KϴOa� ���.�ڊf]`pj)]�����[
�m�`�� (xHṰn ��ޏ|�YUU��}D�s02�����W31ŏ�a-�&X
1Ah�tw�q}��'x��v���\�����3ͷ�#zo�y�)��	�F�3<��9��b�M��1F^V˻+��]3ȑb���Zw�n��8����=|!�'͋��#&����M����.�\/;sV�N�>M}�}4P�;��Ԙ�g:/����N�RBD2 e��H���L�O{�����L������W��R�s�V=#�U�P���(<gQ�m��$��~˾@�߱� c�I��4��-�����Bi���9�t�0�Yc`�՚�<t7���jV���J:�;�����im��X�c�4j��ew�#g-x).��,D��T�m*�c���    ,�{�6!���<Y�̂������a�y(�#D(c��L_bGpУ�r19/�n��Μ��O
]�v��Iu�� mE�3�.�x2�Mb�zTw2�Y����Ժ�ׁ���o���d�-B6�0��MԒ_ȢE�)ra���>X^o$Q�(:%;3���7�u�Vwcb�Z�l	{�2���[��u9s�/	$�.����vE��h4�eb*�:I�0�
G��Si�噫�m5߮�����o�PL�&6B��ٶg(�d�˩�QSL�姦�%g��~"RV����o�|�V�z�`o�
��kF�2RĆ-��qD��%G�P���!���Q�6mRyH�Je��Wt~�*��!(�R��Ǵ�Q�nem�n�z5�J���,pm�gD(�Z���B>��I��]��P��/u�.�T���=�9dM�R��n����7��`���⌤\��c�U�#�C¤���P1��v���5!ǡ�=��F+� �+8-�C�����e$T38*y$x�����io�?٪p�e h+�vBn�v���.9�����4��l�";-s���0�Ϩ�����}�[�W#&4��HδOw!e���_��J�����e�k8�6u�gh\=�(F��Ӭ��;�62o�z�T�.���S!����`�a��L���G�6��HH��*�C<������hQᙓf�*Br;þ���|YF�}�W��¶A<!��=�q�b\u9:R ��M�����jփ>؍�<3\�fd�L�x���_;ua�S�̖!"���������tY�i@3,7�jsQ G;��kc����1�Pm�� &F�~a�j6ɂ��b����G�;S�drY4X ���I�'��Ugڕy�o�V�|����
���ׯ�%c"0�?vHj��Q{ȹ�]�|p����փPv���,;���V{[:����A*3���J�S���������2�o�^�kB����E�.���
�Mz��!�݌�c����(3�j�wT��B5O�n�����i��c>.���j�m<�G�U��t�^��0(X,���=:C�_˯Q��oi��������:�͟O�wep���۾j��nJ�b�~P�e��TA�'8e��ٶȺ�|��($��PDLVi�V�2m����+@(�-�^U+4�����������ˢ|(˴yP�}��.��`�����)�l{�ܲ����n���+b����r���-�W���Ϟ͒���7�%�f�4��r6 �U��Bȳȹ���\D�ceި�@5ERH	@������L�%��Q𐴑@��;ަ�y[Ӛ��̂N��`��6��T��!��=��3�谓����UU��L���æ��y=���#z��h�=�Y��.�լg*Ċeߡ���#�\��W�5ٲ�/	�AV��CN��Q� ��)&���nE��2�� @���9֚�d�*���Z�gkp� ��K%�˞��0����<z�A�!��NȨ��O�+8����>�U@� �%�3 ��}�d�7��g$;�)r(HZϾ�oЌ.ğ��_y��b(Rm����;�n�o�KE��
�/����r��-p�n���B��ё1`�?��z��!�������ݾ�T3��<��}��$��L�7K-6r��
t����}4n�T�؜�-My��v�+��Ņ"��J-_��~GdC�?C$�|M���e�N��t��׷�4��q͡	�:?Do���bY�~���������mN3��� �̰	�'j."��3�e��B#�W��u<S����U��6�"�D%�_��&ۡ47��j��t��N����.�n���-+�˻�
�.���G��j�ii��9߷Y�w%��z����CaT�'���W!�{�P�UD��K;ԟj+��}���@;�؏�ٖ���z;��[K?�g�+�'����/��#��T�b���P���+���5^��P� ��� ���Cg[����jc� S
�j�E�Htv��Eg�_�³v��5Y��j��g7���B�X�g�R�6jH�>ތ;��킡g����5a����z�0�7��S@���:֢!9)������A.e�a_=/�����R	���"��%�V����� �;�{l��e'�ݻ|�G+�gӶ�4�=j`؄+m�`��u�a:<���v��Ҩ$ ��sT;lͯ�ҍ�g���*����:C������X�@��C�t�������rC!/og|�|���د-Kr���X{��>h�v�J�.� }R�s���cxڵf������di�����3�!͒q��3�C� �\�egZ�@#�x��<��l�u��S�ҕ+����,	YL���3)kU����3�4s�U&�skNq��ܗ��|4$�'����}PO���<���?��[��؉]=��$5�du�bb5��g�O� �"�̥��?��z�!:$�:���]H�*0b.�.٬��%ZQk�a�i)
�@B�.��_jɁ��?�Z8Tӽ�# =�7���+����� rթ��� (�Q7C�]�l���C�Ȱfuk65[�X�8\�=";x^��肈T�������>j�LD�s�������>��lկQ���-�4�����S��1��P���k5A����q�JQ%=�PN���X[U�u�v��r]ݶ��ӆ�;Uv�v�s[2��'�]rM�}����J��_�/貢��x���YUX3>)�#�S`+��R��^;>�ZkZv��
 ���� ڳ!Nݝ�k�s��XzƐ;B2�F�C���m��f������7x�j�K=�Q��ȼs�@�%��#�G�����d�)G�0`asy��W�����x69� �����y����%���r�[J���
�l���1���
�U}�7nTQ�8i�_'��j����x삸)%�(ԁ���[s
�.}c;�ɀ���������]�~�wy�i�+ �Xv�1�����
y��:��\�W��a���ȟ�[E�'�S���d�~�/�Ar%-Iw+3���Ҳ�ٌ������5�N���F+Zei�fZ��S�<�Sq'�dX��8Bl���Ĕx�Vf3�u�:�կ�
}T�_6e'3-�k�B{���q0h������9��Qm�g��b-��(��r"�
����H���Cs���]��`�8g"�֢���N�_��(��Y��[@���9��Ĉ��@B��n���J����$�>8ku��j�A����Y�7����6m4�#� ���7?��r>���� b���0�殱��fz��0��3��A��dW������M(rgMȝ����/���>=�����5�~�,��Z�ܱ�@�ڡ��OڶvjBݟ��0kOQ"�0��ݕ����O�<fRǜ7�mK��Z����]>�A�ď���]���c�H	M'\�bM�]1�\�.���J��;� ��,����2'Čd3-�� ��Č]��ʮa�+��0���+n�p���]����6�,�8R�;}}(ߏ䂆Q�}.�Et�%�و�3	�Td�,;�
u����u΍���"��(!@L��U#ĉ\�Ȥ`�{�诶�>ɖ�M'Ry҃Mc�����/� =�{�h1����2TUD�pQ�;T�#��|���ZD>����b��)���[�-��m�� (�Bv����/�%�ΑW[�+���gi��/���F������O��>\td�kR��n���X�5�[�#]�u��7 ����e�Ss물��l�
<� �³���{߮�?y)�5O`�
r�� ��5W:�f7�u��-�ED��4h)
����Bݿ���ݾ�i���s�c�]��rMd�{!y�)��*rԈع�?�6�Y��� �4����d���R	X��'K���MFg��Lb��LM~��}^��('sdp��^��:�ݥ��C�����v-�H�֞�5m�g�"-p�mW֔@U�3�êr�>�F~���w�1!X߾��p�� #�Z�ӯ_��Vw{~�RK2�~�y��U��f��m�.�]����SU�HO>_>    j,4ԉ�0 �'���퐿���f��(?j�G��ʞ�CC'Q�p�/)���k��B�y�/��)������Z3o���W+��R�g���,���	<&@d���D�˻_\��&��z�>\b�e/U�.��r�@�͂�>��\�NYpƪfH�@�W�X���nEe�~�.�ғ�ZpD�|_� 5���б�o*�U��[��Atkoh��j��W��q}�Y[G�����ɕܛ����Z��6�����L��Ll��]�>�h����6k�� �<�G=�e�cQv�7� k����ך
_�ve�߰����$�ѿ�&|%{�S�
�ӊ@�hBF��m. �'i�CC��>�5��Z���'v���v�0X־��?�	�1���Z�����U	3,D��Kc�m��N�K�g�a��<�N��h��:�i#C���FZ����Y����آEf*�>V�b�O2ip�HW#Y�F�4=�1F+_f� �#h7��,�@�JjCM\�h>��3�emZd]���[1�� �v�g��i�[D(S�����+	�m�+�fP��|��z�u@U�|t��j_dO�}�����GV��Y<x�0p!��S�?��&X��נ���%�n{�􊱌���2����vdIu��(�w^^��Q�U.؞oo[�����S����b�٨�4��2<}���3H(�!ӎ!SZ�@��W4���B�|��>��vu�9�a��0�V�|F �Qk�k�m�	���T�R��h;�*��,��G�V4z��(3+k����%��A���YAeH�!�}	�[n���W�Y
�S��4<t�C�:S}�w0����n���5�n��<s��D������?d��(�_���@����.=ZcQKN��	�����*L.A/Pf5�q>�+�[mw���QkʛcQ�����3�����#�{̏���t=�ؕ��(��L$�,%��ȿY� B�36$�i�)^r�omZ��c�!�t��k��h�����)k�ѓ\�X��k\=���Q	~c�V��h�%�S�����'唷�k��Nk{H3@���r�ݍ$��L$m�M��õ�ؖq��Uƹγ`Fl�5��v�� �݃�I�.t��i	��0�Q�Jԭ�f��9:v�+��$��wJ)���Y�0��S��pWwB�)HC_�}�9;�e9P��W�	����� �
-}�2�6-�C]v-�*+'h���436d����٤]f�-(��F�����f� �(����ʇ @�xDb~$S%1�R���vX1ńO���������m�U��]�	�]��i��>�y+OE�X�K!`�f�V�㵰fW��B��dy�5�������[s�;[���:�-��c�l��7�j+C�b��z~�������	0r�(���*z�>�e�罤$dgLr��[�6����rt���Ԇe�+[�a��Kr�Ӈևڋ�2>�3�z��zL��06�ȣ�:R��*��f��6�r�.������,���Ll��c�����Hn�:�F<�Pr�H*D�}�w%ZT�쵄�^[�R�C�D�Z�3�oO�,�9��%����sߤ)�W�!�����\U�Q�U.����@�� t7UI����}y��m,ou��@W�F�V�YKU5r��lw.|m��E�R�}q�44dO/�?S�MS���/�V�5}��yxu�
�ՅT���g#
����حOQ�a
��Y��6B^�˵�?E]�9Rb��\���V!�����&jy��M�/$G!E����C�u��azg-Y���lA,�"F�O��T���,���i��$Ds��?��4*ȬU0_sRvj��bL{{l�N�=��e��Tj��u�	mِ��+A��Pr����x���~�Z��=F�M5��=-lY<�S���y;"�*���U6�sF�}S�X=��+�mm��dg��췽o��O�Y������gd+[�}d�Ky�NsB�&���*
�����ڍ��&io��}V9:{�2�ԯ�j�&�UU���s���!B�P���*[2Ҭ�:�aPA��1�XPt�|To�X$�E8�a`O,���B!�r���:�|ms�;ӶKx�:�I��<�����3��&�ħBb|(Ŋj�n&1W>yϣ���|�:n����_Z�����z��a_��vU���<�|�U�u����:��ӕ)���M^�_[[1���և2��X�B9�;O ;(h���!�o)O��	���w+��V��3�,��	_8�|��V���:s9��oB?$������)ͷ�p��*xۆ��UT��5Q�k�����8������~1������}~N��NsÆ%%��p��]����j������3����x���;*��(<\�!�Ք���:EK�!����"�,��E���U�x
���z	��l���y�C���Ã��?���m�X/��q6v�7T˒چ��_>����h14Z�Uit��!�m��������OM�x�%������n��.C�Jϛ}�����#L�KM4D]hҔW��f���0�~
�$�\�ӇYQ	i��iX9
K�S�9ϦӦh2V���z�V�b�h�
��*��:'y-�,��ҝ��

ŵr����R��	����D���;���V�D�7��t��$�P��$Z{��_�,:�UiI����0�Z�Wc�eK}^`XA���YIJV�®�-�Ju}݊{��ܿ���#ݐ�0n��d}�J�ֆ䤅?C�*ɡ]�q�ޚ�v��W�$�\���9/k�t\�h�Ɂ&��ۻո�9-_S���(mv/Ā���:���Y!�ڼx���]�,j�z�``��*��_I�$�	���gڌ�˹�&��?t[Q3��F�RG���6V�]t�� �} �eZv�NIr_9���~-���V�a�X8�u>��!v}ے���`=pO.����x�/�?�/�W�s����!�l�{�/�>�BEu��$$p]�oYI�y-=[;��=��`����̧��y�u"�F�;������*ϰDBq]ڻC*�"��g��xi����r��ti���/V�;{]�Z��F�	5��;{Y�e^�����R�p���<��H�7&e�*��}���Q�s�f���r�U�?(}�D��k㏰V@�*	Z��B{B�>�w���[�X�+�;��Rz� j��\�I�ﭷ_N�+��$+��gM/��՚�3۔2^�g�i��q%ѳkKv��A���It!T���'F�}���|�xk�|6F���6ɹf�5:���ًt����qu�=	[y�\�H�(lR�|r-��]����M�-d.�nCIi��>4���<�Ut�
4s��>��,�����2	Ą�=�=p�0.��[��e�$r3c�\0�i�_���jnE�QB6���I.��%|�KJ"e��r;\Q6����D[��v-���M�ʻ���Ԓ�/��b�	JvD��˲O��k��b����ƃ���1��a!��7y�Eآ���o_H��K����B����X�b�%Y�aoc�|� /�x�N���o1�wħi�i0���b]�]����v�Q�lB�m3sr���_��jǚQQ��	Y� o�K����6��>�Ġ^��^�#�p�{��\hIFetne3��W3�Xa_�N�g{��v�QPD�p!t��ߚ��g��YA An�$/pt(���C)on:�^a�:��f�i��qi�A�>7h:5�!G���=Ts�=/m�vM�����M��&�<p��j����?2�c�B.�z�Фo� �/#1�oZ�˽�'�����0�~�j9|��q9���������L��ii9��ӵ���K�KHoy����~���d#��}�y^kԩ�y��\W(������2�Kn��� )��nЂIӃ&�'���?�qp_��K,_�m���IN�?���� �i���V%�執����FF/t�J��y	����XR�PO��P:��Q�:k7j������*W�k�S��̥�I["�t��_���|]_�zh���<}��4���#�{�nă��I[/��X���o;{H�[em��w�=���wD����.kg�.��D�>��\٧IRʍH4FI�� �   �ߒ���$��������iG_N�&zĖ&��U����n~�����D�G��"�$N�ҿ��D���	/6r�?���H���
�V���ف������a�r�s��ݟ��/�GqH���CZAe�9�	����s{���wg5�!�^���+y���u��///�>�g      �     x�}��j�0���S�ll'n��Ja��1莽���	b;��=��&c�ዥ}�~)�lL������py����ڮ�Z8a� gT߷\�\KpKW��=8+�࠮�g�XD�0�h�)͎��R�D���y����s��@.n��n��\�L˽�{mD��N�J��s�O
�R�Y�ݙ��J*x�y$�#�ީ��.W
����~���-Ú@*'�0�ʁ22����2ˮ�۔l�b�^��Ou�s9�*���"����!v^     